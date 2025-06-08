import { z } from "zod";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";
import { type Branded } from "fp-ts/lib/Brand";

// Branded Types for validated fields
export interface QueryBrand {
  readonly Query: unique symbol;
}
export type Query = Branded<string, QueryBrand>;

export interface LimitBrand {
  readonly Limit: unique symbol;
}
export type Limit = Branded<number, LimitBrand>;

export interface OffsetBrand {
  readonly Offset: unique symbol;
}
export type Offset = Branded<number, OffsetBrand>;

export type Sort = "asc" | "desc";

export class SearchConditionValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SearchConditionValidationError";
  }
}

// Raw search condition type
export interface RawSearchCondition {
  query?: string;
  limit?: string;
  offset?: string;
  sort?: string;
}

// Validated search condition type
export interface ValidatedSearchCondition {
  query: Query;
  limit: Limit;
  offset: Offset;
  sort: Sort;
}

// Smart constructors for each field
const makeQuery = (value: string): E.Either<SearchConditionValidationError, Query> =>
  pipe(
    O.fromNullable(value),
    O.getOrElse(() => ""),
    E.right,
    E.map((v) => v as Query)
  );

const makeLimit = (value?: string): E.Either<SearchConditionValidationError, Limit> =>
  pipe(
    O.fromNullable(value),
    O.map((v) => parseInt(v, 10)),
    O.getOrElse(() => 10),
    E.fromPredicate(
      (n) => n >= 1 && n <= 100,
      () => new SearchConditionValidationError("limitは1以上100以下で指定してください")
    ),
    E.map((n) => n as Limit)
  );

const makeOffset = (value?: string): E.Either<SearchConditionValidationError, Offset> =>
  pipe(
    O.fromNullable(value),
    O.map((v) => parseInt(v, 10)),
    O.getOrElse(() => 0),
    E.fromPredicate(
      (n) => n >= 0,
      () => new SearchConditionValidationError("offsetは0以上で指定してください")
    ),
    E.map((n) => n as Offset)
  );

const makeSort = (value?: string): E.Either<SearchConditionValidationError, Sort> =>
  pipe(
    O.fromNullable(value),
    O.getOrElse(() => "asc"),
    E.fromPredicate(
      (s): s is Sort => s === "asc" || s === "desc",
      () => new SearchConditionValidationError('sortは"asc"または"desc"で指定してください')
    )
  );

// Main validation function
export const validateSearchCondition = (
  raw: RawSearchCondition
): E.Either<SearchConditionValidationError, ValidatedSearchCondition> =>
  pipe(
    E.Do,
    E.bind("query", () => makeQuery(raw.query)),
    E.bind("limit", () => makeLimit(raw.limit)),
    E.bind("offset", () => makeOffset(raw.offset)),
    E.bind("sort", () => makeSort(raw.sort))
  );

// Value object for validated search condition
export class SearchCondition {
  private constructor(private readonly _value: ValidatedSearchCondition) {}

  static create(raw: RawSearchCondition): E.Either<SearchConditionValidationError, SearchCondition> {
    return pipe(
      validateSearchCondition(raw),
      E.map((validated) => new SearchCondition(validated))
    );
  }

  get query(): Query {
    return this._value.query;
  }

  get limit(): Limit {
    return this._value.limit;
  }

  get offset(): Offset {
    return this._value.offset;
  }

  get sort(): Sort {
    return this._value.sort;
  }
}

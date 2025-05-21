import { z } from "zod";
import { type Either, left, right } from "fp-ts/Either";

export class SearchConditionValidationError extends Error {}

export class UnValidateSearchCondition {
  constructor(
    public query: string,
    public limit: number,
    public offset: number,
    public sort: string
  ) {}
}

export class ValidateSearchCondition {
  private constructor(
    private readonly _query: string,
    private readonly _limit: number,
    private readonly _offset: number,
    private readonly _sort: "asc" | "desc"
  ) {}

  static apply(
    c: UnValidateSearchCondition
  ): Either<SearchConditionValidationError, ValidateSearchCondition> {
    try {
      const querySchema = z.object({
        query: z.coerce.string().default(""),
        limit: z.coerce.number().int().min(1).max(100).default(10),
        offset: z.coerce.number().int().min(0).default(0),
        sort: z.enum(["asc", "desc"]).default("asc"),
      });

      const { query, limit, sort, offset } = querySchema.parse(c);

      return right(new ValidateSearchCondition(query, limit, offset, sort));
    } catch (e) {
      console.error(e);
      return left(new SearchConditionValidationError());
    }
  }
}

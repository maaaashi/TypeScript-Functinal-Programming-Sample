import { z } from "zod";
import { type Either, left, right } from "fp-ts/lib/Either.js";

export class SearchConditionValidationError extends Error {}

export class UnValidateSearchCondition {
  constructor(
    public query?: string,
    public limit?: string,
    public offset?: string,
    public sort?: string
  ) {}

  static make({
    query,
    limit,
    offset,
    sort,
  }: Record<string, string>): UnValidateSearchCondition {
    return new UnValidateSearchCondition(query, limit, offset, sort);
  }
}

export class ValidateSearchCondition {
  protected constructor(
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
        limit: z.coerce
          .number()
          .int()
          .min(1, { message: "limitは1以上で指定してください" })
          .max(100, { message: "limitは100以下で指定してください" })
          .default(10),
        offset: z.coerce
          .number()
          .int()
          .min(0, { message: "offsetは0以上で指定してください" })
          .default(0),
        sort: z
          .enum(["asc", "desc"], {
            message: 'sortは"asc"または"desc"で指定してください',
          })
          .default("asc"),
      });

      const { query, limit, sort, offset } = querySchema.parse(c);

      return right(new ValidateSearchCondition(query, limit, offset, sort));
    } catch (e) {
      let message = "";
      if (e instanceof z.ZodError) {
        message = e.errors.map((err) => err.message).join(", ");
      }
      console.error("Validation error:", message);
      return left(new SearchConditionValidationError(message));
    }
  }

  get query(): string {
    return this._query;
  }

  get limit(): number {
    return this._limit;
  }

  get offset(): number {
    return this._offset;
  }

  get sort(): "asc" | "desc" {
    return this._sort;
  }
}

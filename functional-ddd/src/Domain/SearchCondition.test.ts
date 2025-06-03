import { describe, expect, test } from "vitest";
import {
  SearchConditionValidationError,
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "./SearchCondition.js";
import { fold } from "fp-ts/lib/Either.js";

class ConditionMock extends ValidateSearchCondition {
  static gen(
    query: string,
    limit: number,
    offset: number,
    sort: "asc" | "desc"
  ): ConditionMock {
    return new ValidateSearchCondition(query, limit, offset, sort);
  }
}

describe("SearchCondition", () => {
  describe("ValidateSearchCondition", () => {
    test("正しい検索条件ではOK", () => {
      const result = ValidateSearchCondition.apply(
        new UnValidateSearchCondition("query", "100", "10", "desc")
      );
      fold(
        (error) => {
          throw error;
        },
        (condition) => {
          const expected = ConditionMock.gen("query", 100, 10, "desc");
          expect(condition).toStrictEqual(expected);
        }
      )(result);
    });

    test("デフォルト値の確認", () => {
      const result = ValidateSearchCondition.apply(
        new UnValidateSearchCondition()
      );
      fold(
        (error) => {
          throw error;
        },
        (condition) => {
          const expected = ConditionMock.gen("", 10, 0, "asc");
          expect(condition).toStrictEqual(expected);
        }
      )(result);
    });

    describe("異常系", () => {
      test("異常時にはValidationError型を返す", () => {
        const result = ValidateSearchCondition.apply(
          new UnValidateSearchCondition("query", "10000", "10", "desc")
        );
        fold(
          (error: SearchConditionValidationError) => {
            expect(error).toBeInstanceOf(SearchConditionValidationError);
          },
          (_) => {
            throw new Error("バリデーションが通過してしまいました");
          }
        )(result);
      });

      describe("limit", () => {
        test("limitが0以下", () => {
          const result = ValidateSearchCondition.apply(
            new UnValidateSearchCondition("query", "0", "10", "desc")
          );
          fold(
            (error: SearchConditionValidationError) => {
              expect(error).toBeInstanceOf(SearchConditionValidationError);
              expect(error.message).toContain("limitは1以上で指定してください");
            },
            (_) => {
              throw new Error("バリデーションが通過してしまいました");
            }
          )(result);
        });

        test("limitが100を超える", () => {
          const result = ValidateSearchCondition.apply(
            new UnValidateSearchCondition("query", "101", "10", "desc")
          );
          fold(
            (error: SearchConditionValidationError) => {
              expect(error).toBeInstanceOf(SearchConditionValidationError);
              expect(error.message).toContain(
                "limitは100以下で指定してください"
              );
            },
            (_) => {
              throw new Error("バリデーションが通過してしまいました");
            }
          )(result);
        });
      });

      describe("offset", () => {
        test("offsetが0未満", () => {
          const result = ValidateSearchCondition.apply(
            new UnValidateSearchCondition("query", "10", "-1", "desc")
          );
          fold(
            (error: SearchConditionValidationError) => {
              expect(error).toBeInstanceOf(SearchConditionValidationError);
              expect(error.message).toContain(
                "offsetは0以上で指定してください"
              );
            },
            (_) => {
              throw new Error("バリデーションが通過してしまいました");
            }
          )(result);
        });
      });

      describe("sort", () => {
        test('sortが"asc"または"desc"以外', () => {
          const result = ValidateSearchCondition.apply(
            new UnValidateSearchCondition("query", "10", "0", "invalid")
          );
          fold(
            (error: SearchConditionValidationError) => {
              expect(error).toBeInstanceOf(SearchConditionValidationError);
              expect(error.message).toContain(
                'sortは"asc"または"desc"で指定してください'
              );
            },
            (_) => {
              throw new Error("バリデーションが通過してしまいました");
            }
          )(result);
        });
      });
    });
  });
});

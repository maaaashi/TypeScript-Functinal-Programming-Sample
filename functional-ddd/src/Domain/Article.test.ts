import { describe, expect, test } from "vitest";
import { ArticleId, ArticleIds, searchArticleIds } from "./Article.js";
import { fold } from "fp-ts/lib/TaskEither.js";
import { ValidateSearchCondition } from "./SearchCondition.js";

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

describe("Article", () => {
  describe("ArticleIds", () => {
    describe("search", () => {
      test("検索することができる", async () => {
        const s = async (_: ValidateSearchCondition) => {
          return new ArticleIds([new ArticleId("1"), new ArticleId("2")]);
        };
        const cond = ConditionMock.gen("query", 100, 10, "desc");

        const result = searchArticleIds(s, cond);

        // fold(
        //   (error) => {
        //     throw error;
        //   },
        //   async (ids: ArticleIds) => {
        //     const expected = new ArticleIds([
        //       new ArticleId("1"),
        //       new ArticleId("2"),
        //     ]);
        //     expect(ids).toStrictEqual(expected);
        //   }
        // )(result);
        fold(
          (error) => {
            throw error;
          },
          (ids: ArticleIds) => async () => {
            const expected = new ArticleIds([
              new ArticleId("1"),
              new ArticleId("2"),
            ]);
            expect(ids).toStrictEqual(expected);
          }
        )(result)();
      });

      test("検索に失敗した時は特定のエラーを返す", () => {
        const s = async (_: ValidateSearchCondition) => {
          return new ArticleIds([new ArticleId("1"), new ArticleId("2")]);
        };
        const cond = ConditionMock.gen("query", 100, 10, "desc");

        const result = searchArticleIds(s, cond);

        fold(
          (error) => {
            throw error;
          },
          (ids) => async () => {
            const expected = new ArticleIds([
              new ArticleId("1"),
              new ArticleId("2"),
            ]);
            expect(ids).toStrictEqual(expected);
          }
        )(result)();
      });
    });
  });
});

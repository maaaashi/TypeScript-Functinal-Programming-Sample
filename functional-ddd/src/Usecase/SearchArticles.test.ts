import { expect, test, describe } from "vitest";
import { search } from "./SearchArticles.js";
import { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { fold } from "fp-ts/lib/Either.js";
import {
  Article,
  ArticleId,
  ArticleIds,
  Articles,
  ArticleTitle,
} from "../Domain/Article.js";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";
import type { ArticlesPort } from "../Port/Articles.js";

class ConditionMock extends ValidateSearchCondition {
  static generate(
    query: string,
    limit: number,
    offset: number,
    sort: "asc" | "desc"
  ): ConditionMock {
    return new ConditionMock(query, limit, offset, sort);
  }
}

describe("searchArticlesUsecase", () => {
  describe("search", () => {
    test("検索条件を渡して検索することができる", async () => {
      const validateSearchCondition = ConditionMock.generate(
        "query",
        10,
        0,
        "asc"
      );
      let searchCounter = 0;
      const articleIdsPort: ArticleIdsPort = {
        searchArticleIds: async (cond: ValidateSearchCondition) => {
          expect(cond).toStrictEqual(validateSearchCondition);
          searchCounter++;
          return new ArticleIds([new ArticleId("1"), new ArticleId("2")]);
        },
      };

      let findArticlesCounter = 0;
      const articlesPort: ArticlesPort = {
        findArticles: async (ids: ArticleIds) => {
          expect(ids).toStrictEqual(
            new ArticleIds([new ArticleId("1"), new ArticleId("2")])
          );
          findArticlesCounter++;
          return new Articles([
            new Article(new ArticleId("1"), new ArticleTitle("title 1")),
            new Article(new ArticleId("2"), new ArticleTitle("title 2")),
          ]);
        },
      };

      const actual = await search(
        {
          articleIdsPort,
          articlesPort,
        },
        validateSearchCondition
      )();

      fold(
        (error) => {
          throw error;
        },
        (articles) => {
          const expected = new Articles([
            new Article(new ArticleId("1"), new ArticleTitle("title 1")),
            new Article(new ArticleId("2"), new ArticleTitle("title 2")),
          ]);
          expect(articles).toStrictEqual(expected);
        }
      )(actual);

      expect(searchCounter).toBe(1);
      expect(findArticlesCounter).toBe(1);
    });
  });
});

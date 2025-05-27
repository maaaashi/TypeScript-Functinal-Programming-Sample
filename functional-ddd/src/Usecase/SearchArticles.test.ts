import { expect, test, describe } from "vitest";
import { search } from "./SearchArticles.js";
import { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { fold } from "fp-ts/lib/Either.js";
import { Articles } from "../Domain/Article.js";

const sum = () => {
  return 1 + 2;
};

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
      const result = search(validateSearchCondition);
      const either = await result();

      fold(
        (error) => {
          throw error;
        },
        (articles) => {
          const expected = new Articles([]);
          expect(articles).toStrictEqual(expected);
        }
      )(either);
    });
  });
});

import {
  Article,
  ArticleBody,
  ArticleId,
  Articles,
  ArticleTitle,
  SearchArticlesError,
} from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither } from "fp-ts/lib/TaskEither.js";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";

interface Deps {
  articleIdsPort: ArticleIdsPort;
}

export const search = (
  deps: Deps,
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, Articles> =>
  tryCatch(
    async () => {
      return new Articles([
        new Article(
          new ArticleId("1"),
          new ArticleTitle("title"),
          new ArticleBody("body")
        ),
      ]);
    },
    (e) => {
      if (e instanceof SearchArticlesError) {
        return e;
      }
      return new SearchArticlesError("予期せぬエラーです");
    }
  );

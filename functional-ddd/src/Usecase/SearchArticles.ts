import { Articles, SearchArticlesError } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither } from "fp-ts/lib/TaskEither.js";

export const search = (
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, Articles> =>
  tryCatch(
    async () => {
      return new Articles([]);
    },
    (e) => {
      if (e instanceof SearchArticlesError) {
        return e;
      }
      return new SearchArticlesError("予期せぬエラーです");
    }
  );

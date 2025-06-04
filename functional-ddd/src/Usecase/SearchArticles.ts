import { Articles, SearchArticlesError } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither } from "fp-ts/lib/TaskEither.js";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";
import type { ArticlesPort } from "../Port/Articles.js";

export interface Deps {
  articleIdsPort: ArticleIdsPort;
  articlesPort: ArticlesPort;
}

export const search = (
  deps: Deps,
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, Articles> =>
  tryCatch(
    async () => {
      const ids = await deps.articleIdsPort.searchArticleIds(cond);
      return await deps.articlesPort.findArticles(ids);
    },
    (e) => {
      if (e instanceof SearchArticlesError) {
        return e;
      }
      return new SearchArticlesError("予期せぬエラーです");
    }
  );

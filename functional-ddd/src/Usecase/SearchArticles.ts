import {
  ArticleIds,
  Articles,
  SearchArticlesError,
} from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import { tryCatch, type TaskEither, chain } from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";
import type { ArticlesPort } from "../Port/Articles.js";

export interface Deps {
  articleIdsPort: ArticleIdsPort;
  articlesPort: ArticlesPort;
}

const searchArticleIds = (
  deps: Deps,
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, ArticleIds> =>
  tryCatch(
    () => deps.articleIdsPort.searchArticleIds(cond),
    (e) => new SearchArticlesError("記事IDの検索中にエラーが発生しました")
  );

const findArticles = (
  deps: Deps,
  ids: ArticleIds
): TaskEither<SearchArticlesError, Articles> =>
  tryCatch(
    () => deps.articlesPort.findArticles(ids),
    (e) => new SearchArticlesError("記事の取得中にエラーが発生しました")
  );

export const search = (
  deps: Deps,
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, Articles> =>
  pipe(
    searchArticleIds(deps, cond),
    chain((ids) => findArticles(deps, ids))
  );

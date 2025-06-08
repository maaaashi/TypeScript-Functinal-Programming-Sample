import {
  ArticleIds,
  Articles,
  SearchArticlesError,
} from "../Domain/Article.js";
import { SearchCondition } from "../Domain/SearchCondition.js";
import * as TE from "fp-ts/lib/TaskEither";
import * as E from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";
import type { ArticlesPort } from "../Port/Articles.js";

// Domain errors
export class ArticleIdsSearchError extends SearchArticlesError {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ArticleIdsSearchError";
  }
}

export class ArticlesFetchError extends SearchArticlesError {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "ArticlesFetchError";
  }
}

// Dependencies interface
export interface SearchArticlesDeps {
  articleIdsPort: ArticleIdsPort;
  articlesPort: ArticlesPort;
}

// Port adapters with proper error handling
const searchArticleIds = (
  deps: SearchArticlesDeps,
  cond: SearchCondition
): TE.TaskEither<ArticleIdsSearchError, ArticleIds> =>
  pipe(
    TE.tryCatch(
      () => deps.articleIdsPort.searchArticleIds(cond),
      (error) => new ArticleIdsSearchError("記事IDの検索中にエラーが発生しました", error)
    )
  );

const findArticles = (
  deps: SearchArticlesDeps,
  ids: ArticleIds
): TE.TaskEither<ArticlesFetchError, Articles> =>
  pipe(
    TE.tryCatch(
      () => deps.articlesPort.findArticles(ids),
      (error) => new ArticlesFetchError("記事の取得中にエラーが発生しました", error)
    )
  );

// Main search function with proper error handling and composition
export const search = (
  deps: SearchArticlesDeps,
  cond: SearchCondition
): TE.TaskEither<SearchArticlesError, Articles> =>
  pipe(
    searchArticleIds(deps, cond),
    TE.chain((ids) => findArticles(deps, ids)),
    TE.mapLeft((error) => {
      // Log error details for debugging
      console.error(`Search error: ${error.name}`, {
        message: error.message,
        cause: error.cause,
      });
      return error;
    })
  );

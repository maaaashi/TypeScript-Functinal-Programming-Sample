import {
  Articles,
  findByIds,
  searchArticleIds,
  SearchArticleIdsError,
} from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import {
  SearchArticlesError,
  type FindByIds,
  type SearchArticleIds,
} from "../Domain/Article.js";
import { pipe } from "fp-ts/lib/function.js";
import { chain, mapLeft, type TaskEither } from "fp-ts/lib/TaskEither.js";

export interface Deps {
  searchArticleIds: SearchArticleIds;
  findByIds: FindByIds;
}

export const search = (
  deps: Deps,
  cond: ValidateSearchCondition
): TaskEither<SearchArticlesError, Articles> =>
  pipe(
    cond,
    (c) => searchArticleIds(deps.searchArticleIds, c),
    chain((ids) => findByIds(deps.findByIds, ids)),
    mapLeft((e) => new SearchArticleIdsError(e.message))
  );

import {
  ArticleIds,
  Articles,
} from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import type { FindByIds, SearchArticleIds } from "../Domain/Article.js";
import { pipe } from "fp-ts/lib/function.js";
import { chain, type Task } from "fp-ts/lib/Task.js";

export interface Deps {
  searchArticleIds: SearchArticleIds
  findByIds: FindByIds
}

export const search = (
  deps: Deps,
  cond: ValidateSearchCondition
): Promise<Articles> =>
  pipe(
    cond,
    (cond) => ArticleIds.search(deps.searchArticleIds, cond),
    chain((ids) => Articles.findByIds(deps.findByIds, ids))
  )();

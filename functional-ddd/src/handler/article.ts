import type { Context } from "hono";
import {
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "../Domain/SearchCondition.js";
import { searchArticlesUsecase } from "../Usecase/SearchArticles.js";
import { pipe } from "fp-ts/function";
import { fromEither, chain, map, match } from "fp-ts/TaskEither";

export const searchArticlesHandler = async (c: Context) => {
  const { query, limit, offset, sort } = c.req.query();
  const unvalidateSearchCondition = new UnValidateSearchCondition(
    query,
    +limit,
    +offset,
    sort
  );

  return pipe(
    unvalidateSearchCondition,
    ValidateSearchCondition.apply,
    fromEither,
    chain(searchArticlesUsecase),
    map(({ articles }) => {
      articles.map(({ id, title, body }) => ({ id, title, body }));
    }),
    match(
      (err) => c.json({ error: err.message }, 500),
      (articles) => c.json({ articles })
    )
  );
};

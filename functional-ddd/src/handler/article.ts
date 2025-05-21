import type { Context } from "hono";
import {
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "../Domain/SearchCondition.js";
import { searchArticlesUsecase } from "../Usecase/SearchArticles.js";
import { chain, fromEither, map, match } from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";

export const searchArticlesHandler = async (c: Context) => {
  return pipe(
    c.req.query(),
    UnValidateSearchCondition.make,
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
  )();
};

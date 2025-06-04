import type { Context } from "hono";
import {
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "../Domain/SearchCondition.js";
import * as usecase from "../Usecase/SearchArticles.js";
import {
  chain,
  fromEither,
  map,
  mapLeft,
  match,
} from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { ArticleIdsGateway } from "../Gateway/ArticleIds.js";
import { ArticlesGateway } from "../Gateway/Articles.js";
import { ESDriver } from "../Driver/ESDriver.js";
import { DBDriver } from "../Driver/ArticleDbDriver.js";
import { Client } from "@elastic/elasticsearch";

export const searchArticlesHandler = async (c: Context) => {
  const client = new Client({
    node: "http://localhost:9200",
  });

  const deps: usecase.Deps = {
    articleIdsPort: new ArticleIdsGateway(new ESDriver(client)),
    articlesPort: new ArticlesGateway(new DBDriver()),
  };
  pipe(
    c.req.query(),
    UnValidateSearchCondition.make,
    ValidateSearchCondition.apply,
    fromEither,
    chain((cond) => usecase.search(deps, cond)),
    map(({ articles }) => {
      return articles.map(({ id, title }) => ({ id, title }));
    }),
    match(
      (err) =>
        c.json(
          {
            error: err.message,
            articles: [] as { id: string; title: string }[],
          },
          200
        ),
      (articles) => c.json({ error: "", articles: articles }, 200)
    )
  )();
};

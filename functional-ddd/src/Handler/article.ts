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
  tryCatch,
  TaskEither,
} from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { fold } from "fp-ts/lib/Either.js";
import { ArticleIdsGateway } from "../Gateway/ArticleIds.js";
import { ArticlesGateway } from "../Gateway/Articles.js";
import { ESDriver } from "../Driver/ESDriver.js";
import { DBDriver } from "../Driver/ArticleDbDriver.js";
import { Client } from "@elastic/elasticsearch";

type ArticleResponse = {
  error: string;
  articles: Array<{ id: string; title: string }>;
};

const createErrorResponse = (message: string): ArticleResponse => ({
  error: message,
  articles: [],
});

const createSuccessResponse = (articles: Array<{ id: string; title: string }>): ArticleResponse => ({
  error: "",
  articles,
});

const handleResponse = (response: ArticleResponse) => (c: Context) =>
  c.json(response, 200);

export const searchArticlesHandler = async (c: Context) => {
  const client = new Client({
    node: "http://localhost:9200",
  });

  const deps: usecase.Deps = {
    articleIdsPort: new ArticleIdsGateway(new ESDriver(client)),
    articlesPort: new ArticlesGateway(new DBDriver()),
  };

  return await pipe(
    c.req.query(),
    UnValidateSearchCondition.make,
    ValidateSearchCondition.apply,
    fromEither,
    chain((cond) => usecase.search(deps, cond)),
    map(({ articles }) => articles.map(({ id, title }) => ({ id, title }))),
    map(createSuccessResponse),
    tryCatch(
      handleResponse,
      (error) => createErrorResponse(error instanceof Error ? error.message : "予期せぬエラーが発生しました")
    )
  )();
};

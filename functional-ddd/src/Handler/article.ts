import type { Context } from "hono";
import {
  UnValidateSearchCondition,
  ValidateSearchCondition,
} from "../Domain/SearchCondition.js";
import * as usecase from "../Usecase/SearchArticles.js";
import { chain, fromEither, map, match } from "fp-ts/lib/TaskEither.js";
import { pipe } from "fp-ts/lib/function.js";
import { ESDriver } from "../Driver/ESDriver.js";
import { DBDriver } from "../Driver/ArticleDBDriver.js";
import { Client } from "@elastic/elasticsearch";
import { searchArticleIds } from "../Gateway/ArticleIds.js";
import { findByIds } from "../Gateway/Articles.js";

type ArticleSuccessResponse = {
  articles: Array<{ id: string; title: string }>;
};

type ArticleErrorResponse = {
  error: string;
};

type ArticleResponse = ArticleSuccessResponse | ArticleErrorResponse;

const createErrorResponse = (message: string): ArticleErrorResponse => ({
  error: message,
});

const createSuccessResponse = (
  articles: Array<{ id: string; title: string }>
): ArticleSuccessResponse => ({
  articles,
});

const handleResponse = (response: ArticleResponse) => async (c: Context) => {
  if ("error" in response) {
    return c.json({ message: response.error }, 200);
  }

  return c.json(response, 200);
};

export const searchArticlesHandler = async (c: Context) => {
  const client = new Client({
    node: "http://localhost:9200",
  });

  const deps: usecase.Deps = {
    searchArticleIds: searchArticleIds(new ESDriver(client)),
    findByIds: findByIds(new DBDriver()),
  };

  return await pipe(
    c.req.query(),
    UnValidateSearchCondition.make,
    ValidateSearchCondition.apply,
    fromEither,
    chain((cond) => usecase.search(deps, cond)),
    map(({ articles }) => articles.map(({ id, title }) => ({ id, title }))),
    map(createSuccessResponse),
    match(
      (error) => handleResponse(createErrorResponse(error.message))(c),
      (success) => handleResponse(success)(c)
    )
  )();
};

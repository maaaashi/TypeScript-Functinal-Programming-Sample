import type { Context } from "hono";
import { searchArticles, SearchCondition } from "../services/articleService.js";

export const searchArticlesController = async (c: Context) => {
  const { query, limit, sort, page, offset } = c.req.query();
  const cond = new SearchCondition(query, +limit, +offset, sort, +page);
  const articles = await searchArticles(cond);

  return c.json({
    articles,
  });
};

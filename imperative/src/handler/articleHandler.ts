import type { Context } from "hono";
import { searchArticles, SearchCondition } from "../services/articleService.js";

export const searchArticlesHandler = async (c: Context) => {
  const { query, limit, sort, offset } = c.req.query();
  const cond = new SearchCondition(
    query,
    +limit,
    +offset,
    sort as "asc" | "desc"
  );
  const articles = await searchArticles(cond);

  return c.json({
    articles,
  });
};

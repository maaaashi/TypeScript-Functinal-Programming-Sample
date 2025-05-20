import type { Context } from "hono";
import { searchArticles, SearchCondition } from "../services/articleService.js";
import { z } from "zod";

const querySchema = z.object({
  query: z.coerce.string().default(""),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  offset: z.coerce.number().int().min(0).default(0),
  sort: z.enum(["asc", "desc"]).default("asc"),
});

export const searchArticlesHandler = async (c: Context) => {
  try {
    const { query, limit, sort, offset } = querySchema.parse(c.req.query());

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
  } catch (e) {
    console.error(e);
    return c.json({
      articles: [],
    });
  }
};

import { findArticles } from "../infra/articleRepository.js";
import type { Article } from "../model/article.js";

export class SearchCondition {
  constructor(
    private readonly query: string,
    private readonly limit: number,
    private readonly offset: number,
    private readonly sort: string,
    private readonly page: number
  ) {}
}

export const searchArticles = async (
  cond: SearchCondition
): Promise<Article[]> => {
  const articleIds = ["1", "2", "3"];
  const articles = await findArticles(articleIds);
  return articles;
};

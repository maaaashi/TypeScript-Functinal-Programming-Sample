import { findArticles } from "../infra/articleRepository.js";
import { searchArticleDocuments } from "../infra/elasticSearch.js";
import { Article } from "../model/article.js";

export class SearchCondition {
  constructor(
    private readonly _query: string,
    private readonly limit: number,
    private readonly offset: number,
    private readonly sort: string,
    private readonly page: number
  ) {}

  get query(): string {
    return this._query;
  }
}

export const searchArticles = async (
  cond: SearchCondition
): Promise<Article[]> => {
  const articleIds = await searchArticleDocuments(cond);
  const articles = await findArticles(articleIds.map((id) => +id));
  return articles.map(({ id, title, url }) => new Article(`${id}`, title, url));
};

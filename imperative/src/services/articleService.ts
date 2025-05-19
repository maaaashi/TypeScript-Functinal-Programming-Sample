import { findArticles } from "../infra/articleRepository.js";
import { searchArticleDocuments } from "../infra/elasticSearch.js";
import { Article } from "../model/article.js";

export class SearchCondition {
  constructor(
    private readonly _query: string,
    private readonly _limit: number,
    private readonly _offset: number,
    private readonly _sort: "asc" | "desc"
  ) {}

  get query(): string {
    return this._query;
  }

  get limit(): number {
    return this._limit;
  }

  get offset(): number {
    return this._offset;
  }

  get sort(): "asc" | "desc" {
    return this._sort;
  }
}

export const searchArticles = async (
  cond: SearchCondition
): Promise<Article[]> => {
  const articleIds = await searchArticleDocuments(cond);
  const articles = await findArticles(articleIds.map((id) => +id));
  return articles.map(({ id, title, url }) => new Article(`${id}`, title, url));
};

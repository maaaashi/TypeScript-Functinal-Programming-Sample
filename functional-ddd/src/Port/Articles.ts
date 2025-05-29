import type { ArticleIds, Articles } from "../Domain/Article.js";

export interface ArticlesPort {
  findArticles(ids: ArticleIds): Promise<Articles>;
}

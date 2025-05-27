import type { ArticleIds } from "../Domain/Article.js";

export interface ArticleIdsPort {
  searchArticleIds(): Promise<ArticleIds>;
}

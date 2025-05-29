import type { ArticleIds } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";

export interface ArticleIdsPort {
  searchArticleIds(condition: ValidateSearchCondition): Promise<ArticleIds>;
}

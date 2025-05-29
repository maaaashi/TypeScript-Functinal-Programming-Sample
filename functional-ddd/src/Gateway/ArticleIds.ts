import { ArticleId, ArticleIds } from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import type { ESDriver } from "../Driver/ESDriver.js";
import type { ArticleIdsPort } from "../Port/ArticleIds.js";

export class ArticleIdsGateway implements ArticleIdsPort {
  constructor(private driver: ESDriver) {}
  async searchArticleIds({
    query,
    offset,
    sort,
    limit,
  }: ValidateSearchCondition): Promise<ArticleIds> {
    const result = await this.driver.searchArticleIds(
      query,
      limit,
      offset,
      sort
    );

    return new ArticleIds(
      result.hits.hits.map((h) => new ArticleId(h._source!.id))
    );
  }
}

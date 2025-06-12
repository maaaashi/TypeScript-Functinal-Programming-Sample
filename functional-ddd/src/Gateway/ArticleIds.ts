import {
  ArticleId,
  ArticleIds,
  type SearchArticleIds,
} from "../Domain/Article.js";
import type { ValidateSearchCondition } from "../Domain/SearchCondition.js";
import type { ESDriver } from "../Driver/ESDriver.js";

export const searchArticleIds: (driver: ESDriver) => SearchArticleIds =
  (driver: ESDriver) =>
  async ({ query, offset, sort, limit }: ValidateSearchCondition) => {
    const result = await driver.searchArticleIds(query, limit, offset, sort);

    return new ArticleIds(
      result.hits.hits.map((h) => new ArticleId(h._source!.id))
    );
  };

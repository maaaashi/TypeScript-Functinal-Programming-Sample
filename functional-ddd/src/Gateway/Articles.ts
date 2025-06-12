import {
  Article,
  ArticleId,
  Articles,
  ArticleTitle,
  type ArticleIds,
  type FindByIds,
} from "../Domain/Article.js";
import type { DBDriver } from "../Driver/ArticleDBDriver.js";

export const findByIds: (driver: DBDriver) => FindByIds =
  (driver: DBDriver) => async (ids: ArticleIds) => {
    const articles = await driver.findArticles(ids.values);
    return new Articles(
      articles.map(
        (a) => new Article(new ArticleId(a.id), new ArticleTitle(a.title))
      )
    );
  };

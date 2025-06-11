import {
  Article,
  ArticleId,
  Articles,
  ArticleTitle,
  type ArticleIds,
} from "../Domain/Article.js";
import type { DBDriver } from "../Driver/ArticleDbDriver.js";
import type { ArticlesPort } from "../Port/Articles.js";

export class ArticlesGateway implements ArticlesPort {
  constructor(private driver: DBDriver) {}
  async findArticles(ids: ArticleIds): Promise<Articles> {
    const articles = await this.driver.findArticles(ids.values);
    return new Articles(
      articles.map(
        (a) => new Article(new ArticleId(a.id), new ArticleTitle(a.title))
      )
    );
  }
}

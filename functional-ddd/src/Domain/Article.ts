import type { ValidateSearchCondition } from "./SearchCondition.js";
import { type TaskEither, of, tryCatch } from "fp-ts/lib/TaskEither.js";

export class SearchArticleIdsError extends Error {}

export type SearchArticleIds = (
  cond: ValidateSearchCondition
) => Promise<ArticleIds>;

export class ArticleIds {
  constructor(private _ids: ArticleId[]) {}

  get values(): string[] {
    return this._ids.map((id) => id.value);
  }

  static search(
    search: SearchArticleIds,
    cond: ValidateSearchCondition
  ): TaskEither<SearchArticleIdsError, ArticleIds> {
    return tryCatch(
      async () => await search(cond),
      () => new SearchArticlesError("")
    );
  }
}

export class ArticleId {
  constructor(private _value: string) {}
  get value(): string {
    return this._value;
  }
}

export class ArticleTitle {
  constructor(private _value: string) {}
  get value(): string {
    return this._value;
  }
}

export class ArticleBody {
  constructor(private _value: string) {}
  get value(): string {
    return this._value;
  }
}

export class Article {
  constructor(
    private readonly _id: ArticleId,
    private readonly _title: ArticleTitle
  ) {}

  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title.value;
  }
}

export type FindByIds = (ids: ArticleIds) => Promise<Articles>;

export class Articles {
  constructor(private readonly _articles: Article[]) {}

  get articles(): Article[] {
    return this._articles;
  }

  static findByIds(
    find: FindByIds,
    ids: ArticleIds
  ): TaskEither<SearchArticlesError, Articles> {
    return tryCatch(
      async () => find(ids),
      () => new SearchArticlesError("")
    );
  }
}

export class SearchArticlesError extends Error {}

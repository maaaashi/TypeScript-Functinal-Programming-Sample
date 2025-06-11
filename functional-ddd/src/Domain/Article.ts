import { of, type Task } from "fp-ts/lib/Task.js";
import type { ValidateSearchCondition } from "./SearchCondition.js";

export type SearchArticleIds = (ids: ArticleIds) => Promise<ArticleIds>;

export class ArticleIds {
  constructor(private _ids: ArticleId[]) {}

  get values(): string[] {
    return this._ids.map((id) => id.value);
  }

  static search(search: SearchArticleIds, cond: ValidateSearchCondition): Task<ArticleIds> {
    return of(new ArticleIds([]))
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

  static findByIds(find: FindByIds, ids: ArticleIds): Task<Articles> {
    return of(new Articles([]))
  }
}

export class SearchArticlesError extends Error {}

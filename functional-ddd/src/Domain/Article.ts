import { type Branded } from 'fp-ts/lib/Brand'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/function'

// Branded Types
export interface ArticleIdBrand {
  readonly ArticleId: unique symbol
}
export type ArticleId = Branded<string, ArticleIdBrand>

export interface ArticleTitleBrand {
  readonly ArticleTitle: unique symbol
}
export type ArticleTitle = Branded<string, ArticleTitleBrand>

export interface ArticleBodyBrand {
  readonly ArticleBody: unique symbol
}
export type ArticleBody = Branded<string, ArticleBodyBrand>

// Smart constructors
export const makeArticleId = (value: string): E.Either<Error, ArticleId> =>
  pipe(
    value,
    E.fromPredicate(
      (v) => v.length > 0,
      () => new Error('ArticleId cannot be empty')
    ),
    E.map((v) => v as ArticleId)
  )

export const makeArticleTitle = (value: string): E.Either<Error, ArticleTitle> =>
  pipe(
    value,
    E.fromPredicate(
      (v) => v.length > 0 && v.length <= 100,
      () => new Error('ArticleTitle must be between 1 and 100 characters')
    ),
    E.map((v) => v as ArticleTitle)
  )

export const makeArticleBody = (value: string): E.Either<Error, ArticleBody> =>
  pipe(
    value,
    E.fromPredicate(
      (v) => v.length > 0,
      () => new Error('ArticleBody cannot be empty')
    ),
    E.map((v) => v as ArticleBody)
  )

// Value Objects
export class ArticleIds {
  constructor(private readonly _ids: ArticleId[]) {}

  get values(): string[] {
    return this._ids.map((id) => id)
  }

  static create(ids: string[]): E.Either<Error, ArticleIds> {
    return pipe(
      ids,
      E.traverseArray(makeArticleId),
      E.map((validIds) => new ArticleIds(validIds))
    )
  }
}

export class Article {
  private constructor(
    private readonly _id: ArticleId,
    private readonly _title: ArticleTitle
  ) {}

  get id(): ArticleId {
    return this._id
  }

  get title(): ArticleTitle {
    return this._title
  }

  static create(id: string, title: string): E.Either<Error, Article> {
    return pipe(
      E.Do,
      E.bind('id', () => makeArticleId(id)),
      E.bind('title', () => makeArticleTitle(title)),
      E.map(({ id, title }) => new Article(id, title))
    )
  }
}

export class Articles {
  private constructor(private readonly _articles: Article[]) {}

  get articles(): Article[] {
    return this._articles
  }

  static create(articles: Article[]): Articles {
    return new Articles(articles)
  }
}

export class SearchArticlesError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SearchArticlesError'
  }
}

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
    private readonly _title: ArticleTitle,
    private readonly _body: ArticleBody
  ) {}

  get id(): string {
    return this._id.value;
  }

  get title(): string {
    return this._title.value;
  }

  get body(): string {
    return this._body.value;
  }
}

export class Articles {
  constructor(private readonly _articles: Article[]) {}

  get articles(): Article[] {
    return this._articles;
  }
}

export class SearchArticlesError extends Error {}

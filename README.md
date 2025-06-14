<a href="https://github.com/maaaashi/TypeScript-Functinal-Programming-Sample/actions/workflows/test.yaml" rel="nofollow">
  <img src="https://github.com/maaaashi/TypeScript-Functinal-Programming-Sample/actions/workflows/test.yaml/badge.svg" alt="Gauge E2E Tests">
</a>
<a href="https://twitter.com/pg_maaaashi" rel="nofollow">
  <img src="https://img.shields.io/badge/created%20by-@pg_maaaashi-4BBAAB.svg" alt="created by X@pg_maaaashi">
</a>

# TypeScript-Functinal-Programming-Sample

このリポジトリは、同一のユースケースに対して 2 種類の設計アプローチを比較したサンプルコードです。

👉 気になった方は[こちら](https://zenn.dev/maaaashi/articles/aea1a85753acf6)の記事も合わせてご覧ください。

## 📦 ディレクトリ構成

```
src/
├── es/
|   ├── articles.json   # ダミーデータ
|   ├── compose.yaml    # Elasticsearch
|   └── es_setup.sh     # es 初期化スクリプト
├── functional-ddd/     # 関数型 + ドメイン駆動設計
|   └── package-lock.json
├── es/
├── imperative/         # 命令型
|   └── package-lock.json
├── README.md
└── test.http
```

## 🔧 DB セットアップ (SQLite)

```bash
$ cd db
$ npm install
$ npm run db:init
```

## 🔧 ES セットアップ

```bash
$ cd es
$ docker compose up
$ ./es_setup.sh (初回のみ)
```

## 🧩 ユースケース

架空の検索システムを題材に、以下の操作を共通の要件として実装しています。

- 記事の検索
- 記事データの取得

## 📚 技術スタック

- TypeScript
- hono
  - 軽量な Web フレームワーク
- prisma
  - ORM
- Elasticsearch
  - 検索エンジン
- zod
  - バリデーションライブラリ
- fp-ts
  - 関数型ライブラリ、functional-ddd で使用

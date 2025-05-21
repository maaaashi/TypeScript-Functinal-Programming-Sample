# TypeScript-Functinal-Programming-Sample

このリポジトリは、同一のユースケースに対して 2 種類の設計アプローチを比較したサンプルコードです。

👉 気になった方は[こちら](https://zenn.dev/maaaashi/articles/aea1a85753acf6)の記事も合わせてご覧ください。

## 📦 ディレクトリ構成

```
src/
├── compose.yaml    # Elasticsearch
├── imperative/     # 一般的なサービス設計スタイル（命令型）
└── functional-ddd/ # 関数型 + ドメイン駆動設計スタイル
```

## 🔧 DB セットアップ (SQLite)

```bash
$ cd db
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

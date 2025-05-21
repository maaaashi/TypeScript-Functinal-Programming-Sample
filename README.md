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
$ docker run -it --rm -e "discovery.type=single-node" -e "xpack.security.enabled=false" -p 9200:9200 -p 9300:9300 docker.elastic.co/elasticsearch/elasticsearch:9.0.1
$ ./es_setup.sh
```

## 🧩 ユースケース

架空の検索システムを題材に、以下の操作を共通の要件として実装しています。

- 注文の作成
- 請求書の生成
- ステータスの変更

## 📚 技術スタック

- TypeScript
- hono
- fp-ts（関数型ライブラリ、functional-ddd で使用）

# TypeScript-Functinal-Programming-Sample

このリポジトリは、同一のユースケースに対して 2 種類の設計アプローチを比較したサンプルコードです。

👉 気になった方は[こちら](https://your-blog-link.dev/ddd-vs-traditional)の記事も合わせてご覧ください。


## 📦 ディレクトリ構成

```
src/
├── environments    # DBなどの共通セットアップ
├── imperative/     # 一般的なサービス設計スタイル（命令型）
└── functional-ddd/ # 関数型 + ドメイン駆動設計スタイル
```


## 🧩 ユースケース

架空の検索システムを題材に、以下の操作を共通の要件として実装しています。

- 注文の作成
- 請求書の生成
- ステータスの変更

## 📚 技術スタック

- TypeScript
- hono
- fp-ts（関数型ライブラリ、functional-dddで使用）

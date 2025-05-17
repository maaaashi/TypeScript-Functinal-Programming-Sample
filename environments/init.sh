#!/bin/bash

# 適当な待機（ESの起動完了を待つ）
# sleep 10

# インデックス作成（オプション）
curl -X PUT "http://localhost:9200/articles" -H 'Content-Type: application/json'

# データ登録（例：バルク）
curl -X POST "http://localhost:9200/_bulk" -H 'Content-Type: application/x-ndjson' --data-binary @/usr/share/elasticsearch/data.json

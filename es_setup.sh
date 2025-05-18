
curl -X PUT "http://localhost:9200/articles" \
  -H 'Content-Type: application/json' \
  -d '{
    "settings": {
      "number_of_shards": 1,
      "number_of_replicas": 0
    },
    "mappings": {
      "properties": {
        "id":       { "type": "keyword" },
        "title":    { "type": "text" },
        "content":  { "type": "text" }
      }
    }
  }'

curl -s https://qiita.com/api/v2/items/13cdf02c394cf9668de7 \
| jq -r '{id: 1, title: .title, content: .rendered_body}' \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

curl -s https://qiita.com/api/v2/items/3376cdd0b6ee75c634eb \
| jq -r '{id: 2, title: .title, content: .rendered_body}' \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

curl -s https://qiita.com/api/v2/items/f592357a70307820f0dc \
| jq -r '{id: 3, title: .title, content: .rendered_body}' \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

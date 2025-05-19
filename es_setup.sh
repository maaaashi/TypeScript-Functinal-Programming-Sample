
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
        "content":  { "type": "text" },
        "created_at":  { "type": "date" }
      }
    }
  }'

jq -r '{id: 1, title: .title, content: .rendered_body, created_at: .created_at}' articles/1.json \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

jq -r '{id: 2, title: .title, content: .rendered_body, created_at: .created_at}' articles/2.json \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

jq -r '{id: 3, title: .title, content: .rendered_body, created_at: .created_at}' articles/3.json \
| curl -X POST "http://localhost:9200/articles/_doc" \
  -H 'Content-Type: application/json' \
  -d @-

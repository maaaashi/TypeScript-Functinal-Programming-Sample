
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

jq -c '.[] | {id: .id, title: .title, content: .body, created_at: .created_at}' articles.json | \
while read -r article; do
  echo "$article" | \
  curl -s -X POST "http://localhost:9200/articles/_doc" \
    -H 'Content-Type: application/json' \
    -d @- | jq .
done
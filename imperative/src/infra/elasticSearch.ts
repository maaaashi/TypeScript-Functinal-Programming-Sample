import { Client } from "@elastic/elasticsearch";
import type { SearchCondition } from "../services/articleService.js";

interface Document {
  id: string;
  title: string;
  content: string;
  creted_at: string;
}

export const searchArticleDocuments = async ({
  query,
  offset,
  sort,
  limit,
}: SearchCondition) => {
  try {
    const client = new Client({
      node: "http://localhost:9200",
    });
    console.group(query, offset, sort, limit);
    const sortField = "created_at";
    const result = await client.search<Document>({
      index: "articles",
      from: offset,
      size: limit,
      sort: [{ [sortField]: { order: sort } }],
      query: {
        match: { content: query },
      },
    });

    return result.hits.hits.map((h) => h._source!.id);
  } catch (e) {
    console.error(e);
    return [];
  }
};

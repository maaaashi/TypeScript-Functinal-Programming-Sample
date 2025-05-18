import { Client } from "@elastic/elasticsearch";
import type { SearchCondition } from "../services/articleService.js";

interface Document {
  id: string;
  title: string;
  content: string;
}

export const searchArticleDocuments = async ({ query }: SearchCondition) => {
  try {
    const client = new Client({
      node: "http://localhost:9200",
    });

    const result = await client.search<Document>({
      index: "articles",
      query: {
        match: { content: query },
      },
    });

    console.log(result.hits.hits);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
  return [1, 2];
};

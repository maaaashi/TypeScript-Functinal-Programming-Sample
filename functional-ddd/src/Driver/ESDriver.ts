import { Client } from "@elastic/elasticsearch";

interface Document {
  id: string;
  title: string;
  content: string;
  creted_at: string;
}

export class ESDriver {
  constructor(client: Client) {}

  async searchArticleIds(
    query: string,
    limit: number,
    offset: number,
    sort: "asc" | "desc"
  ) {
    const client = new Client({
      node: "http://localhost:9200",
    });

    const sortField = "created_at";

    return await client.search<Document>({
      index: "articles",
      from: offset,
      size: limit,
      sort: [{ [sortField]: { order: sort } }],
      query: {
        match: { content: query },
      },
    });
  }
}

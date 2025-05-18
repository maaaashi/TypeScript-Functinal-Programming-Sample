import { Client } from "@elastic/elasticsearch";

const client = new Client({});

interface Document {
  id: string;
  title: string;
  content: string;
}

async function run() {
  const result = await client.search<Document>({
    index: "articles",
    query: {
      match: { content: "winter" },
    },
  });

  console.log(result.hits.hits);
}

run().catch(console.log);

import { Client } from "@elastic/elasticsearch";

const client = new Client({
  cloud: { id: "<cloud-id>" },
  auth: { apiKey: "base64EncodedKey" },
});

interface Document {
  character: string;
  quote: string;
}

async function run() {
  const result = await client.search<Document>({
    index: "game-of-thrones",
    query: {
      match: { quote: "winter" },
    },
  });

  console.log(result.hits.hits);
}

run().catch(console.log);

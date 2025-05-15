import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { searchArticlesController } from "./controllers/articleController.js";

const app = new Hono();

app.get("/articles", async (c) => {
  return await searchArticlesController(c);
});

app.get("/search", async (c) => {
  const query = c.req.query("q");
  console.log(query);
  return c.json({ query });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);

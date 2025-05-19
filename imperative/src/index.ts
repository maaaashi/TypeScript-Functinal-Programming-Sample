import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { searchArticlesController } from "./controllers/articleController.js";

const app = new Hono();

app.get("/articles", async (c) => {
  return await searchArticlesController(c);
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

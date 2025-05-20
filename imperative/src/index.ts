import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { searchArticlesHandler } from "./handler/articleHandler.js";

const app = new Hono();

app.get("/articles", async (c) => {
  return await searchArticlesHandler(c);
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

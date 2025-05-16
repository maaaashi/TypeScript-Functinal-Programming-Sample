import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

async function main() {
  const articles = await prisma.article.findMany();

  if (articles.length === 0) {
    await prisma.article.create({
      data: {
        id: 1,
        title: "【CSS】flex-growを使おう",
        url: "https://qiita.com/maaaashi/items/13cdf02c394cf9668de7",
        createdAt: new Date(),
        tagedArticles: {
          create: [{ tag: { create: { name: "CSS" } } }],
        },
      },
    });
    await prisma.article.create({
      data: {
        id: 2,
        title: "再利用性を高めたWeb Components",
        url: "https://qiita.com/maaaashi/items/3376cdd0b6ee75c634eb",
        createdAt: new Date(),
        tagedArticles: {
          create: [
            { tag: { create: { name: "JavaScript" } } },
            { tag: { create: { name: "WebComponents" } } },
            { tag: { create: { name: "TypeScript" } } },
            { tag: { create: { name: "Lit" } } },
          ],
        },
      },
    });
    await prisma.article.create({
      data: {
        id: 3,
        title: "Clojureとは",
        url: "https://qiita.com/maaaashi/items/f592357a70307820f0dc",
        createdAt: new Date(),
        tagedArticles: {
          create: [{ tag: { create: { name: "Clojure" } } }],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

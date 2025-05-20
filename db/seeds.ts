import { PrismaClient } from "./generated/prisma/index.js";

const prisma = new PrismaClient();

const articleSetup = async () => {
  const url = "https://qiita.com/api/v2/items?per_page=100&query=user:maaaashi";
  const response = await fetch(url);
  const articles = (await response.json()) as any[];
  const registerArticleFuncitons = articles.map(async (a) => {
    await prisma.article.create({
      data: {
        id: a.id,
        title: a.title,
        url: a.url,
        createdAt: new Date(a.created_at),
        tagedArticles: {
          create: a.tags.map((t) => ({
            tag: {
              connectOrCreate: {
                where: { name: t.name },
                create: { name: t.name },
              },
            },
          })),
        },
      },
    });
    console.log(`Article ${a.id} created`);
  });

  await Promise.all(registerArticleFuncitons);
};

async function main() {
  const articles = await prisma.article.findMany();

  if (articles.length === 0) {
    await articleSetup();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

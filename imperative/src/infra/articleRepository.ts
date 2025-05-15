import { PrismaClient } from "../../generated/prisma/index.js";

export const findArticles = async (ids: number[]) => {
  const prisma = new PrismaClient();
  return await prisma.article.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      tagedArticles: {
        include: {
          tag: true,
        },
      },
    },
  });
};

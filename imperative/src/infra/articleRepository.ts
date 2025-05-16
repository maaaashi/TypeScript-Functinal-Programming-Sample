import { PrismaClient } from "../../generated/prisma/index.js";

const prisma = new PrismaClient();

export const findArticles = async (ids: number[]) => {
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

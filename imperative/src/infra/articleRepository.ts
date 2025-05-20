import { PrismaClient } from "../../../db/generated/prisma/index.js";

const prisma = new PrismaClient();

export const findArticles = async (ids: string[]) => {
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

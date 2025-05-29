import { PrismaClient } from "../../../db/generated/prisma/index.js";

export class DBDriver {
  async findArticles(ids: string[]) {
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
  }
}

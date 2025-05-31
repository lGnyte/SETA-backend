import {PrismaClient, Prisma} from '../generated/prisma';

const prisma = new PrismaClient();

export const ChapterPartRepository = {
    
    update: (id: number, data: Prisma.ChapterPartUpdateInput) => {
    return prisma.chapterPart.update({
      where: { id },
      data,
    });
  },

   delete: (id: number) => {
    return prisma.chapterPart.delete({
      where: { id },
    });
  },

    createChapterPart: async (chapterId: number, chapterPartData: Prisma.ChapterPartCreateInput & { order?: number }) => {
        let orderToSet = chapterPartData.order ?? 0;

        if (!orderToSet || orderToSet === 0) {
            // Count existing parts for this chapter
            const partCount = await prisma.chapterPart.count({
                where: { chapterId },
            });
            orderToSet = partCount + 1;
        }

        return prisma.chapterPart.create({
            data: {
                ...chapterPartData,
                order: orderToSet,
                chapter: { connect: { id: chapterId } },
            },
        });
    },

     getByChapterId: (chapterId: number) => {
    return prisma.chapterPart.findMany({
      where: { chapterId },
      include: { author: true },
      orderBy: { order: 'asc' },
    });
  },
}


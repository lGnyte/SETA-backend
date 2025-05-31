import {PrismaClient, Prisma} from '../generated/prisma';

const prisma = new PrismaClient();

export const ChapterPartRepository = {
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
}
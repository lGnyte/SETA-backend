import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export const getChapterById = async (id: number) => {
    return prisma.chapter.findUnique({
        where: {
            id: id,
        },
    });
};

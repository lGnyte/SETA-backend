import {PrismaClient, Prisma} from '../generated/prisma';

const prisma = new PrismaClient();

export const getChapterById = async (id: number) => {
    return prisma.chapter.findUnique({
        where: {
            id: id,
        },
        include: {
            chapterParts: {
                orderBy: {
                    order: 'asc'
                },
            },
        }
    });
};

export const updateChapter = async (id: number, data: Prisma.ChapterUpdateInput) => {
    return prisma.chapter.update({
        where: {id},
        data,
    });
};

export const deleteChapter = async (id: number) => {
    return prisma.chapter.delete({
        where: {id},
    });
};

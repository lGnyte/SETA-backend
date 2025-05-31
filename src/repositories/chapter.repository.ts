import {Prisma, PrismaClient} from '../generated/prisma';

const prisma = new PrismaClient();

export const getChapterById = async (id: number) => {
    await ensureChapterExists(id);
    return prisma.chapter.findUnique({
        where: { id },
        include: {
            chapterParts: { orderBy: { order: 'asc' } },
            editRequesters: true,
            contributors: true,
        },
    });
};

export const updateChapter = async (id: number, data: Prisma.ChapterUpdateInput) => {
    await ensureChapterExists(id);
    return prisma.chapter.update({
        where: { id },
        data,
    });
};


export const deleteChapter = async (id: number) => {
    await ensureChapterExists(id);
    return prisma.chapter.delete({
        where: { id },
    });
};

export const requestChapterEditAccess = async (chapterId: number, userId: number) => {
    await ensureChapterExists(chapterId);
    return prisma.chapter.update({
        where: { id: chapterId },
        data: {
            editRequesters: {
                connect: { id: userId },
            },
        },
        include: {
            editRequesters: true,
        },
    });
};

export const getChapterEditRequesters = async (chapterId: number) => {
    await ensureChapterExists(chapterId);
    const chapter = await prisma.chapter.findUnique({
        where: { id: chapterId },
        select: {
            editRequesters: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                },
            },
        },
    });

    return chapter?.editRequesters ?? [];
};

export const approveChapterEditRequest = async (chapterId: number, userId: number) => {
    await ensureChapterExists(chapterId);

    const requester = await prisma.chapter.findUnique({
        where: { id: chapterId },
        select: {
            editRequesters: {
                where: { id: userId },
                select: { id: true },
            },
        },
    });

    const isRequester = (requester?.editRequesters?.length ?? 0) > 0;
    if (!isRequester) {
        throw new Error('User did not request edit access for this chapter');
    }

    return prisma.chapter.update({
        where: { id: chapterId },
        data: {
            editRequesters: { disconnect: { id: userId } },
            contributors: { connect: { id: userId } },
        },
        include: {
            contributors: { select: { id: true, username: true, email: true } },
            editRequesters: { select: { id: true, username: true, email: true } },
        },
    });
};

export const denyEditAccessRequest = async (chapterId: number, userId: number) => {
    // Check if chapter exists
   await ensureChapterExists(chapterId);

    const requester = await prisma.chapter.findUnique({
        where: { id: chapterId },
        select: {
            editRequesters: {
                where: { id: userId },
                select: { id: true },
            },
        },
    });

    const isRequester = (requester?.editRequesters?.length ?? 0) > 0;

    if (!isRequester) {
        throw new Error('User did not request edit access for this chapter');
    }
    // Remove user from editRequesters list
    return prisma.chapter.update({
        where: { id: chapterId },
        data: {
            editRequesters: {
                disconnect: { id: userId },
            },
        },
        include: {
            contributors: { select: { id: true, username: true, email: true } },
            editRequesters: { select: { id: true, username: true, email: true } },
        },
    });
};

const ensureChapterExists = async (id: number) => {
    const chapter = await prisma.chapter.findUnique({ where: { id } });
    if (!chapter) {
        throw new Error(`Chapter with ID ${id} not found`);
    }
    return chapter;
};


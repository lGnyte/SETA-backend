import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();

export const ensureBookExists = async (bookId: number) => {
    const exists = await prisma.book.findUnique({ where: { id: bookId }, select: { id: true } });
    if (!exists) {
        throw new Error(`Book with ID ${bookId} not found`);
    }
}

export const BookRepository = {
    getAll: () => prisma.book.findMany({
        include: {
            genres: true,
            tags: true,
            chapters: true,
            characters: true,
            owner: {
                select: {
                    username: true,
                }
            }
        },
    }),

    getById: async (id: number) => {
        await ensureBookExists(id);
        return prisma.book.findUnique({
            where: { id },
            include: {
                genres: true,
                tags: true,
                chapters: {
                    orderBy: { order: 'asc' },
                },
                characters: true,
                owner: {
                    select: {
                        username: true,
                    }
                }
            },
        });
    },

    getByOwnerId: async (ownerId: number) => {
        return prisma.book.findMany({
            where: {ownerId},
            orderBy: {createdAt: 'desc'},
            include: {
                genres: true,
                tags: true,
                chapters: true,
                characters: true,
            },
        });
    },

    create: (data: Prisma.BookCreateInput) =>
        prisma.book.create({
            data,
            include: {
                genres: true,
                tags: true,
                chapters: true,
                characters: true,
            },
        }),

    update: async (id: number, data: Prisma.BookUpdateInput) => {
        await ensureBookExists(id);
        return prisma.book.update({
            where: { id },
            data,
            include: {
                genres: true,
                tags: true,
                chapters: true,
                characters: true,
            },
        });
    },

    delete: async (id: number) => {
        await ensureBookExists(id);
        return prisma.book.delete({ where: { id } });
    },

    patch: async (id: number, data: Prisma.BookUpdateInput) => {
        await ensureBookExists(id);
        return prisma.book.update({
            where: { id },
            data,
        });
    },

    createChapter: async (bookId: number, chapterData: Prisma.ChapterCreateInput) => {
        await ensureBookExists(bookId);

        let orderToSet = chapterData.order ?? 0;

        if (!orderToSet || orderToSet === 0) {
            const chapterCount = await prisma.chapter.count({
                where: { bookId },
            });
            orderToSet = chapterCount + 1;
        }

        return prisma.chapter.create({
            data: {
                ...chapterData,
                order: orderToSet,
                book: { connect: { id: bookId } },
            },
        });
    },

    getChapters: async (bookId: number) => {
        await ensureBookExists(bookId);
        return prisma.chapter.findMany({
            where: { bookId },
            include: {
                characters: true,
            },
        });
    },

    getCharactersByBookId: async (bookId: number) => {
        await ensureBookExists(bookId);
        return prisma.character.findMany({
            where: { bookId },
            include: {
                traits: true,
                book: true,
            },
        });
    },

    assignTags: async (bookId: number, tagIds: number[]) => {
        await ensureBookExists(bookId);
        return prisma.book.update({
            where: { id: bookId },
            data: {
                tags: {
                    set: [],
                    connect: tagIds.map((id) => ({ id })),
                },
            },
        });
    },

    assignGenres: async (bookId: number, genreIds: number[]) => {
        await ensureBookExists(bookId);
        return prisma.book.update({
            where: { id: bookId },
            data: {
                genres: {
                    set: [],
                    connect: genreIds.map((id) => ({ id })),
                },
            },
        });
    },
};

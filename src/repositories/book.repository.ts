import {PrismaClient, Prisma} from '../generated/prisma';

const prisma = new PrismaClient();

export const BookRepository = {
    getAll: () => prisma.book.findMany({
        include: {
            genres: true,
            tags: true,
            chapters: true,
            characters: true,
        },
    }),

    getById: (id: number) =>
        prisma.book.findUnique({
            where: {id},
            include: {
                genres: true,
                tags: true,
                chapters: {
                    orderBy: {
                        order: 'asc',  // or 'desc' if you want descending order
                    },
                },
                characters: true,
            },
        }),

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

    update: (id: number, data: Prisma.BookUpdateInput) =>
        prisma.book.update({
            where: {id},
            data,
            include: {
                genres: true,
                tags: true,
                chapters: true,
                characters: true,
            },
        }),

    delete: (id: number) =>
        prisma.book.delete({where: {id}}),

    patch: async (id: number, data: Prisma.BookUpdateInput) => {
        return prisma.book.update({
            where: {id},
            data,
        });
    },

    createChapter: async (bookId: number, chapterData: Prisma.ChapterCreateInput) => {
        let orderToSet = chapterData.order ?? 0;

        if (!orderToSet || orderToSet === 0) {
            // Count existing chapters for this book
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
    }
    assignTags: (bookId: number, tagIds: number[]) => {
        return prisma.book.update({
            where: {id: bookId},
            data: {
                tags: {
                    set: [],
                    connect: tagIds.map((id) => ({id})),
                },
            },
        });
    },

    assignGenres: (bookId: number, genreIds: number[]) => {
        return prisma.book.update({
            where: {id: bookId},
            data: {
                genres: {
                    set: [],
                    connect: genreIds.map((id) => ({id})),
                },
            },
        });
    },
};

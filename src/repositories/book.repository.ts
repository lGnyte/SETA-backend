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
                chapters: true,
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

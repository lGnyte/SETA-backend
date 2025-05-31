import {BookRepository, ensureBookExists} from '../repositories/book.repository';
import {PrismaClient, Prisma} from '../generated/prisma';
import BookRoutes from "../routes/book.routes";
import {CharacterRepository} from "../repositories/character.repository";
import {AzureBlobService} from "./blobStorage.service";

const prisma = new PrismaClient();


export const BookService = {
    getAll: () => BookRepository.getAll(),

    getById: (id: number) => BookRepository.getById(id),

    create: (data: Prisma.BookCreateInput) => BookRepository.create(data),

    update: (id: number, data: Prisma.BookUpdateInput) => BookRepository.update(id, data),

    delete: (id: number) => BookRepository.delete(id),

    patch: (id: number, data: Prisma.BookUpdateInput) => BookRepository.patch(id, data),

    createBookChapter: (bookId: number, chapterData: Prisma.ChapterCreateInput) => BookRepository.createChapter(bookId, chapterData),

    getChapters: (bookId: number) => BookRepository.getChapters(bookId),

    getCharactersByBookId: (bookId: number) => {
        return BookRepository.getCharactersByBookId(bookId);
    },

    assignTags: (bookId: number, tagIds: number[]) => BookRepository.assignTags(bookId, tagIds),

    assignGenres: (bookId: number, genreIds: number[]) => BookRepository.assignGenres(bookId, genreIds),

    async uploadCover(bookId: number, base64: string): Promise<string> {
        await ensureBookExists(bookId);

        const {url} = await AzureBlobService.uploadBase64File(base64, 'covers');

        // Update character record with avatar URL
        await BookRepository.update(bookId, {coverUrl: url});

        return url;
    }
};
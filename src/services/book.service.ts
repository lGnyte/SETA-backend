import { BookRepository } from '../repositories/book.repository';
import { PrismaClient, Prisma } from '../generated/prisma';
import BookRoutes from "../routes/book.routes";

const prisma = new PrismaClient();


export const BookService = {
  getAll: () => BookRepository.getAll(),

  getById: (id: number) => BookRepository.getById(id),

  create: (data: Prisma.BookCreateInput) => BookRepository.create(data),

  update: (id: number, data: Prisma.BookUpdateInput) => BookRepository.update(id, data),

  delete: (id: number) => BookRepository.delete(id),

  patch: (id: number, data: Prisma.BookUpdateInput) => BookRepository.patch(id, data),

  createBookChapter: (bookId: number, chapterData: Prisma.ChapterCreateInput) => BookRepository.createChapter(bookId, chapterData),
  assignTags: (bookId: number, tagIds: number[]) => BookRepository.assignTags(bookId, tagIds),

  assignGenres: (bookId: number, genreIds: number[]) => BookRepository.assignGenres(bookId, genreIds),
};
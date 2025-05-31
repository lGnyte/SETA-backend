import { BookRepository } from '../repositories/book.repository';
import { PrismaClient, Prisma } from '../generated/prisma';

const prisma = new PrismaClient();


export const BookService = {
  getAll: () => BookRepository.getAll(),

  getById: (id: number) => BookRepository.getById(id),

  create: (data: Prisma.BookCreateInput) => BookRepository.create(data),

  update: (id: number, data: Prisma.BookUpdateInput) => BookRepository.update(id, data),

  delete: (id: number) => BookRepository.delete(id),

  patch: (id: number, data: Prisma.BookUpdateInput) => BookRepository.patch(id, data),
};
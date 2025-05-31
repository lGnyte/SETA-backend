import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

// GET /books
export const getAllBooksController = async (_req: Request, res: Response) => {
  try {
    const books = await BookService.getAll();
    res.json(books);
  } catch (err) {
    console.error('[GET /books]', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET /books/:id
export const getBookByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const book = await BookService.getById(id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (err) {
    console.error(`[GET /books/${id}]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /books
export const createBookController = async (req: Request, res: Response) => {
  try {
    const book = await BookService.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error('[POST /books]', err);
    res.status(400).json({ message: 'Failed to create book', error: err });
  }
};

export const updateBookController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const book = await BookService.update(id, req.body);
    res.json(book);
  } catch (err) {
    console.error(`[PUT /books/${id}]`, err);
    res.status(400).json({ message: 'Failed to update book', error: err });
  }
};

// DELETE /books/:id
export const deleteBookController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    await BookService.delete(id);
    res.status(204).send();
  } catch (err) {
    console.error(`[DELETE /books/${id}]`, err);
    res.status(400).json({ message: 'Failed to delete book', error: err });
  }
};

export const patchBookController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const updatedBook = await BookService.patch(id, req.body); 
    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(updatedBook);
  } catch (err) {
    console.error(`[PATCH /books/${id}]`, err);
    res.status(400).json({ message: 'Failed to patch book', error: err });
  }
};
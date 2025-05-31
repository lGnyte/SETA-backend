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

export const createBookChapterController =  async (req: Request, res: Response) => {
  try {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
      res.status(400).json({message: 'Invalid book ID'});
    }

    // Assuming the request body contains chapter data except bookId
    const chapterData = req.body;

    const newChapter = await BookService.createBookChapter(bookId, chapterData);

    res.status(201).json(newChapter);
  } catch (error) {
    console.error('Failed to create chapter:', error);
    res.status(500).json({message: 'Internal server error'});
  }
}

export const getBookChaptersController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.id);
  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const chapters = await BookService.getChapters(bookId);
    res.json(chapters);
  } catch (err: unknown) {
    console.error(`[GET /books/${bookId}/chapters]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getCharactersByBookIdController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.id);
  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  try {
    const characters = await BookService.getCharactersByBookId(bookId);
    if (!characters || characters.length === 0) {
      res.status(404).json({ message: 'No characters found for this book' });
      return;
    }
    res.json(characters);
  } catch (error) {
    console.error(`[GET /books/${bookId}/characters]`, error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const assignTagsController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.id);
  const { tagIds } = req.body;

  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  if (!Array.isArray(tagIds) || !tagIds.every(id => typeof id === 'number')) {
    res.status(400).json({ message: 'Invalid tagIds: must be an array of numbers' });
    return;
  }

  try {
    const updatedBook = await BookService.assignTags(bookId, tagIds);
    res.status(200).json({ message: 'Tags assigned successfully', book: updatedBook });
  } catch (err) {
    console.error(`[POST /books/${bookId}/tags]`, err);
    res.status(500).json({ message: 'Failed to assign tags to book', error: err });
  }
};

// POST /books/:id/genres
export const assignGenresController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.id);
  const { genreIds } = req.body;

  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  if (!Array.isArray(genreIds) || !genreIds.every(id => typeof id === 'number')) {
    res.status(400).json({ message: 'Invalid genreIds: must be an array of numbers' });
    return;
  }

  try {
    const updatedBook = await BookService.assignGenres(bookId, genreIds);
    res.status(200).json({ message: 'Genres assigned successfully', book: updatedBook });
  } catch (err) {
    console.error(`[POST /books/${bookId}/genres]`, err);
    res.status(500).json({ message: 'Failed to assign genres to book', error: err });
  }
};

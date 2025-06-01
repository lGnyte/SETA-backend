import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
import { sendResponse } from "../utils/response";
import {CharacterService} from "../services/character.service";

// GET /books
export const getAllBooksController = async (_req: Request, res: Response) => {
    try {
        const books = await BookService.getAll();
        sendResponse(res, books);
    } catch (err: any) {
        console.error('[GET /books]', err);
        sendResponse(res, null, false, `Internal server error: ${err.message || err}`, 500);
    }
};

// GET /books/:id
export const getBookByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const book = await BookService.getById(id);
        if (!book) {
            sendResponse(res, null, false, 'Book not found', 404);
            return;
        }
        sendResponse(res, book);
    } catch (err: any) {
        console.error(`[GET /books/${id}]`, err);
        sendResponse(res, null, false, `Internal server error: ${err.message || err}`, 500);
    }
};

export const createBookController = async (req: Request, res: Response) => {
    try {
        const book = await BookService.create(req.body);
        sendResponse(res, book, true, null, 201);
    } catch (err: any) {
        console.error('[POST /books]', err);
        sendResponse(res, null, false, `Failed to create book: ${err.message || err}`, 400);
    }
};

export const updateBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const book = await BookService.update(id, req.body);
        sendResponse(res, book);
    } catch (err: any) {
        console.error(`[PUT /books/${id}]`, err);
        sendResponse(res, null, false, `Failed to update book: ${err.message || err}`, 400);
    }
};

export const deleteBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        await BookService.delete(id);
        res.status(204).send();
    } catch (err: any) {
        console.error(`[DELETE /books/${id}]`, err);
        sendResponse(res, null, false, `Failed to delete book: ${err.message || err}`, 400);
    }
};

// PATCH /books/:id
export const patchBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const updatedBook = await BookService.patch(id, req.body);
        if (!updatedBook) {
            sendResponse(res, null, false, 'Book not found', 404);
            return;
        }
        sendResponse(res, updatedBook);
    } catch (err: any) {
        console.error(`[PATCH /books/${id}]`, err);
        sendResponse(res, null, false, `Failed to patch book: ${err.message || err}`, 400);
    }
};

// POST /books/:id/chapters
export const createBookChapterController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const chapterData = req.body;
        const newChapter = await BookService.createBookChapter(bookId, chapterData);
        sendResponse(res, newChapter, true, null, 201);
    } catch (err: any) {
        console.error(`[POST /books/${bookId}/chapters]`, err);
        sendResponse(res, null, false, `Failed to create chapter: ${err.message || err}`, 500);
    }
};

// GET /books/:id/chapters
export const getBookChaptersController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const chapters = await BookService.getChapters(bookId);
        sendResponse(res, chapters);
    } catch (err: any) {
        console.error(`[GET /books/${bookId}/chapters]`, err);
        sendResponse(res, null, false, `Internal server error: ${err.message || err}`, 500);
    }
};

// GET /books/:id/characters
export const getCharactersByBookIdController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    try {
        const characters = await BookService.getCharactersByBookId(bookId);
        if (!characters || characters.length === 0) {
            sendResponse(res, null, false, 'No characters found for this book', 404);
            return;
        }
        sendResponse(res, characters);
    } catch (err: any) {
        console.error(`[GET /books/${bookId}/characters]`, err);
        sendResponse(res, null, false, `Internal server error: ${err.message || err}`, 500);
    }
};

export const assignTagsController = async (req: Request, res: Response): Promise<void> => {
    const bookId = Number(req.params.id);
    const { tagIds } = req.body;

    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    if (!Array.isArray(tagIds) || !tagIds.every(id => typeof id === 'number')) {
        sendResponse(res, null, false, 'Invalid tagIds: must be an array of numbers', 400);
        return;
    }

    try {
        const updatedBook = await BookService.assignTags(bookId, tagIds);
        sendResponse(res, updatedBook, true, 'Tags assigned successfully');
    } catch (err: any) {
        console.error(`[POST /books/${bookId}/tags]`, err);
        sendResponse(res, null, false, `Failed to assign tags: ${err.message || err}`, 500);
    }
};

export const assignGenresController = async (req: Request, res: Response): Promise<void> => {
    const bookId = Number(req.params.id);
    const { genreIds } = req.body;

    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }

    if (!Array.isArray(genreIds) || !genreIds.every(id => typeof id === 'number')) {
        sendResponse(res, null, false, 'Invalid genreIds: must be an array of numbers', 400);
        return;
    }

    try {
        const updatedBook = await BookService.assignGenres(bookId, genreIds);
        sendResponse(res, updatedBook, true, 'Genres assigned successfully');
    } catch (err: any) {
        console.error(`[POST /books/${bookId}/genres]`, err);
        sendResponse(res, null, false, `Failed to assign genres: ${err.message || err}`, 500);
    }
};

export const uploadBookCoverController  = async (req: Request, res: Response) =>{
    const bookId = Number(req.params.id);
    const {base64} = req.body;

    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
        return;
    }
    try {
        const coverUrl = await BookService.uploadCover(bookId, base64);
        sendResponse(res, {coverUrl}, true, 'Cover generated successfully');
    } catch (err) {
        console.error(`[POST /books/${bookId}/uploadCover]`, err);
        sendResponse(res, null, false, 'Failed to upload cover', 500);
    }
    
};

export const getMyBooks = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user?.id;

  if (!userId) {
    sendResponse(res, null, false, 'Unauthorized', 401);
    return;
  }

  try {
    const books = await BookService.getBooksByOwnerId(userId);
    sendResponse(res, books, true);
  } catch (err) {
    console.error('[GET /mybooks]', err);
    sendResponse(res, null, false, 'Failed to fetch user books', 500);
  }
};


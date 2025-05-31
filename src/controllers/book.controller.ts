import {Request, Response} from 'express';
import {BookService} from '../services/book.service';
import {ApiResponse, sendResponse} from "../utils/response";

// GET /books
export const getAllBooksController = async (_req: Request, res: Response) => {
    try {
        const books = await BookService.getAll();
        sendResponse(res, books);
    } catch (err) {
        console.error('[GET /books]', err);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};

// GET /books/:id
export const getBookByIdController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const book = await BookService.getById(id);
        if (!book) {
            sendResponse(res, null, false, 'Book not found', 404);
        }
        sendResponse(res, book);
    } catch (err) {
        console.error(`[GET /books/${id}]`, err);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};

export const createBookController = async (req: Request, res: Response) => {
    try {
        const book = await BookService.create(req.body);
        sendResponse(res, book, true, null, 201);
    } catch (err) {
        console.error('[POST /books]', err);
        sendResponse(res, null, false, 'Failed to create book', 400);
    }
};

export const updateBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const book = await BookService.update(id, req.body);
        sendResponse(res, book);
    } catch (err) {
        console.error(`[PUT /books/${id}]`, err);
        sendResponse(res, null, false, 'Failed to update book', 400);
    }
};


export const deleteBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        await BookService.delete(id);
        // For 204 No Content, don't send a body, but we can also send a success response with message if you want consistency
        res.status(204).send();
    } catch (err) {
        console.error(`[DELETE /books/${id}]`, err);
        sendResponse(res, null, false, 'Failed to delete book', 400);
    }
};

// PATCH /books/:id
export const patchBookController = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const updatedBook = await BookService.patch(id, req.body);
        if (!updatedBook) {
            sendResponse(res, null, false, 'Book not found', 404);
        }
        sendResponse(res, updatedBook);
    } catch (err) {
        console.error(`[PATCH /books/${id}]`, err);
        sendResponse(res, null, false, 'Failed to patch book', 400);
    }
};

// POST /books/:id/chapters
export const createBookChapterController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const chapterData = req.body;
        const newChapter = await BookService.createBookChapter(bookId, chapterData);
        sendResponse(res, newChapter, true, null, 201);
    } catch (error) {
        console.error('Failed to create chapter:', error);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};

// GET /books/:id/chapters
export const getBookChaptersController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const chapters = await BookService.getChapters(bookId);
        sendResponse(res, chapters);
    } catch (err) {
        console.error(`[GET /books/${bookId}/chapters]`, err);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};

// GET /books/:id/characters
export const getCharactersByBookIdController = async (req: Request, res: Response) => {
    const bookId = Number(req.params.id);
    if (isNaN(bookId)) {
        sendResponse(res, null, false, 'Invalid book ID', 400);
    }

    try {
        const characters = await BookService.getCharactersByBookId(bookId);
        if (!characters || characters.length === 0) {
            sendResponse(res, null, false, 'No characters found for this book', 404);
        }
        sendResponse(res, characters);
    } catch (error) {
        console.error(`[GET /books/${bookId}/characters]`, error);
        sendResponse(res, null, false, 'Internal server error', 500);
    }
};
import { Request, Response } from 'express';
import { CharacterService } from '../services/character.service';
import { sendResponse } from '../utils/response';

export const getCharacterByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    sendResponse(res, null, false, 'Invalid character ID', 400);
    return;
  }

  try {
    const character = await CharacterService.getById(id);
    if (!character) {
      sendResponse(res, null, false, 'Character not found', 404);
      return;
    }
    sendResponse(res, character);
  } catch (err: unknown) {
    console.error(`[GET /characters/${id}]`, err);
    sendResponse(res, null, false, 'Internal server error', 500);
  }
};

// POST /books/:bookId/characters
export const createCharacterController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.bookId);
  if (isNaN(bookId)) {
    sendResponse(res, null, false, 'Invalid book ID', 400);
    return;
  }

  const data = req.body;
  try {
    const newCharacter = await CharacterService.create(bookId, data);
    sendResponse(res, newCharacter, true, null, 201);
  } catch (err: unknown) {
    console.error(`[POST /books/${bookId}/characters]`, err);
    sendResponse(res, null, false, 'Internal server error', 500);
  }
};

// PUT /characters/:id
export const updateCharacterController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    sendResponse(res, null, false, 'Invalid character ID', 400);
    return;
  }

  const data = req.body;
  try {
    const updatedCharacter = await CharacterService.update(id, data);
    if (!updatedCharacter) {
      sendResponse(res, null, false, 'Character not found', 404);
      return;
    }
    sendResponse(res, updatedCharacter);
  } catch (err: unknown) {
    console.error(`[PUT /characters/${id}]`, err);
    sendResponse(res, null, false, 'Internal server error', 500);
  }
};

// DELETE /characters/:id
export const deleteCharacterController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    sendResponse(res, null, false, 'Invalid character ID', 400);
    return;
  }

  try {
    await CharacterService.delete(id);
    res.status(204).send();
  } catch (err: unknown) {
    console.error(`[DELETE /characters/${id}]`, err);
    sendResponse(res, null, false, 'Internal server error', 500);
  }
};

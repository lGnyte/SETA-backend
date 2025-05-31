import { Request, Response } from 'express';
import { CharacterService } from '../services/character.service';


export const getCharacterByIdController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid character ID' });
    return;
  }

  try {
    const character = await CharacterService.getById(id);
    if (!character) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }
    res.json(character);
  } catch (err: unknown) {
    console.error(`[GET /characters/${id}]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// POST /books/:bookId/characters
export const createCharacterController = async (req: Request, res: Response): Promise<void> => {
  const bookId = Number(req.params.bookId);
  if (isNaN(bookId)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  const data = req.body;
  try {
    const newCharacter = await CharacterService.create(bookId, data);
    res.status(201).json(newCharacter);
  } catch (err: unknown) {
    console.error(`[POST /books/${bookId}/characters]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT /characters/:id
export const updateCharacterController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid character ID' });
    return;
  }

  const data = req.body;
  try {
    const updatedCharacter = await CharacterService.update(id, data);
    if (!updatedCharacter) {
      res.status(404).json({ message: 'Character not found' });
      return;
    }
    res.json(updatedCharacter);
  } catch (err: unknown) {
    console.error(`[PUT /characters/${id}]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE /characters/:id
export const deleteCharacterController = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid character ID' });
    return;
  }

  try {
    await CharacterService.delete(id);
    res.status(204).send(); // No content
  } catch (err: unknown) {
    console.error(`[DELETE /characters/${id}]`, err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


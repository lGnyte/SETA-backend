import { Request, Response } from 'express';
import { fetchAllUsers } from '../services/user.service';

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    console.error('[GET /users]', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

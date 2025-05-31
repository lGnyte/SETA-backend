import { Request, Response } from 'express';
import { fetchAllUsers } from '../services/user.service';
import { loginUser, registerUser } from '../services/auth.services';

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (err) {
    console.error('[GET /users]', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const registerController = async (_req: Request, res: Response) => {
  try {
    const { email, password, username } = _req.body;
    if (!email || !password || !username) {
      res.status(400).json({ message: 'Missing fields' });
      return;
    }

    const token = await registerUser({ email, password, username });
    res.json({ token });
  } catch (err) {
    console.error('[POST /register]', err);
    res.status(400).json({ message: (err as Error).message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Missing fields' });
      return;
    }

    const token = await loginUser({ email, password, rememberMe });
    if (!token) {
      res.status(500).json({message: 'Internal Server Error'});
    }
    
    res.status(200).json({ token });
    
  } catch (err) {
    console.error('[POST /login]', err);
    res.status(401).json({ message: (err as Error).message });
  }
};

export const getMeController = (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.json(user);
};

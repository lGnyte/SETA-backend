import { Request, Response } from 'express';

export const getMeController = (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  res.json({ user });
};

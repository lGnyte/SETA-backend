import { Request, Response } from 'express';
import { fetchAllUsers } from '../services/user.service';
import { loginUser, registerUser } from '../services/auth.services';
import { sendResponse } from "../utils/response";

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await fetchAllUsers();
    sendResponse(res, users, true);
  } catch (err) {
    console.error('[GET /users]', err);
    sendResponse(res, null, false, 'Internal server error', 500);
  }
};

export const registerController = async (_req: Request, res: Response) => {
  try {
    const { email, password, username } = _req.body;
    if (!email || !password || !username) {
      sendResponse(res, null, false, 'Missing fields', 400);
      return;
    }

    const token = await registerUser({ email, password, username });
    sendResponse(res, { token }, true);
  } catch (err) {
    console.error('[POST /register]', err);
    sendResponse(res, null, false, (err as Error).message, 400);
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      sendResponse(res, null, false, 'Missing fields', 400);
      return;
    }

    const token = await loginUser({ email, password, rememberMe });
    if (!token) {
      sendResponse(res, null, false, 'Internal Server Error', 500);
      return;
    }

    sendResponse(res, { token }, true);
  } catch (err) {
    console.error('[POST /login]', err);
    sendResponse(res, null, false, (err as Error).message, 401);
  }
};

export const getMeController = (req: Request, res: Response) => {
  const user = (req as any).user;

  if (!user) {
    sendResponse(res, null, false, 'Unauthorized', 401);
    return;
  }

  sendResponse(res, user, true);
};

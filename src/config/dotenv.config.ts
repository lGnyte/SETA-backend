import dotenv from 'dotenv';
import { Secret } from 'jsonwebtoken';
dotenv.config();

export const APP_PORT = process.env.APP_PORT || 3000;
export const CORS_ORIGINS = (process.env.CORS_ORIGINS || '').split(',');
export const JWT_SECRET :Secret = process.env.JWT_SECRET as Secret;

import { PrismaClient } from '../generated/prisma'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/dotenv.config';

const prisma = new PrismaClient();

export const registerUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      username,
    },
  });

  return generateToken(user.id, user.email, user.username);
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  return generateToken(user.id, user.email, user.username);
};

const generateToken = (id: number, email: string, username: string) :string => {
  const token = jwt.sign({ id, email, username }, JWT_SECRET, { expiresIn: '20h' });
  return token;
};

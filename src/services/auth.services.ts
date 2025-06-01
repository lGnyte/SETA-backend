import {PrismaClient} from '../generated/prisma'
import bcrypt from 'bcrypt';
import jwt, {SignOptions} from 'jsonwebtoken';
import {JWT_SECRET} from '../config/dotenv.config';
import { v4 as uuidv4 } from 'uuid';


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

  await prisma.wallet.create({
    data: {
      id: uuidv4(), // generate UUID here explicitly
      amount: 12.0,
      user: {
        connect: { id: user.id },
      },
    },
  });

  return generateToken(user.id, user.email, user.username);
};

export const loginUser = async ({
  email,
  password, 
  rememberMe = false,
}: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid password');
  }

  return generateToken(user.id, user.email, user.username, !rememberMe);
};

const generateToken = (id: number, email: string, username: string, doExpire = true) :string => {
  if (!JWT_SECRET) {
    throw new Error('JWT secret not set');
  }
  
  let options : SignOptions = {};
  if (doExpire) {
    options.expiresIn = '20h';
  }

  return jwt.sign({id, email, username}, JWT_SECRET, options);
};

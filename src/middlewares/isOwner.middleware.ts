// import { Request, Response, NextFunction } from 'express';
// import { PrismaClient } from '../generated/prisma';
//
// const prisma = new PrismaClient();
//
// export async function isOwner(req: Request, res: Response, next: NextFunction) {
//     const bookId = parseInt(req.params.id);
//     const user = req.user; // this assumes you're using auth middleware to populate req.user
//
//     if (!user) {
//         return res.status(401).json({ error: 'Unauthorized' });
//     }
//
//     try {
//         const book = await prisma.book.findUnique({
//             where: { id: bookId },
//             select: { ownerId: true },
//         });
//
//         if (!book) {
//             return res.status(404).json({ error: 'Book not found' });
//         }
//
//         if (book.ownerId !== user.id) {
//             return res.status(403).json({ error: 'Forbidden: You do not own this book' });
//         }
//
//         next();
//     } catch (err) {
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }

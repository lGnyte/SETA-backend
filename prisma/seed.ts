import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();


async function main() {
  // Seed users
  const users = [
    {
      email: 'alice@example.com',
      username: 'alice123',
      password: 'password123',
    },
    {
      email: 'bob@example.com',
      username: 'bob123',
      password: 'password123',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  const genres = [
    { name: 'Fantasy' },
    { name: 'Science Fiction' },
    { name: 'Romance' },
    { name: 'Mystery' },
    { name: 'Thriller' },
    { name: 'Non-Fiction' },
  ];

  for (const genre of genres) {
    const existing = await prisma.genre.findFirst({
      where: { name: genre.name },
    });

    if (!existing) {
      await prisma.genre.create({ data: genre });
      console.log(`Created genre: ${genre.name}`);
    } else {
      console.log(`Genre already exists: ${genre.name}`);
    }
  }

  console.log('Genre seeding complete');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

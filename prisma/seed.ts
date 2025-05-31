import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
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

  console.log('Seeding complete');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

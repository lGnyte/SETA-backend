import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export async function getAllTags() {
    return prisma.tag.findMany();
}

export async function createTag(name: string) {
    return prisma.tag.create({ data: { name } });
}

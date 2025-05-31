import { PrismaClient, Prisma } from '../generated/prisma';
import { CharacterRepository } from '../repositories/character.repository';
import {AzureBlobService} from "./blobStorage.service";
import {ImageGenerationService} from "./imageGeneration.service";

export const CharacterService = {
  getById: (id: number) => CharacterRepository.getById(id),

  create: (bookId: number, data: Prisma.CharacterCreateInput) => {
    return CharacterRepository.create(bookId, data);
  },

  update: (id: number, data: Prisma.CharacterUpdateInput) => {
    return CharacterRepository.update(id, data);
  },

  delete: (id: number) => {
    return CharacterRepository.delete(id);
  },

  async uploadAvatar(characterId: number, base64: string): Promise<string> {
    await CharacterRepository.ensureCharacterExists(characterId);

    const { url } = await AzureBlobService.uploadBase64File(base64, 'avatars');

    // Update character record with avatar URL
    await CharacterRepository.update(characterId, { avatarUrl: url });

    return url;
  },

  async generateAvatar(characterId: number) {
    const character = await CharacterRepository.getById(characterId);

    if (!character) {
      throw new Error(`Character with ID ${characterId} not found`);
    }

    const prompt = generatePrompt(character);
    //const base64DataUrl = await ImageGenerationService.generateImage(prompt);
    const base64Url ="https://modelslab-bom.s3.amazonaws.com/modelslab/8f1ab812-821b-4002-a8a6-93dfd0f52a33-0.base64";
    if (!base64Url) {
      throw new Error(`Avatar could not be generated.`);
    }

    // Fetch base64 string from the URL using fetch
    let base64DataUrl: string;
    try {
      const response = await fetch(base64Url);
      if (!response.ok) {
        throw new Error(`Failed to fetch image, status: ${response.status}`);
      }
      base64DataUrl = await response.text();
    } catch (error) {
      throw new Error(`Failed to fetch base64 image from URL: ${error}`);
    }

    // Upload the base64 string to Azure Blob
    const { url } = await AzureBlobService.uploadBase64File(base64DataUrl, 'avatars');

    // Update the character record with avatar URL
    await CharacterRepository.update(characterId, { avatarUrl: url });

    return url;
  }
};

function generatePrompt(character: {
  name: string;
  description: string | null;
  traits: { name: string }[];
  book: { title: string | null };
}): string {
  return `Create a **funny** fantasy character portrait with the following traits:
Name: ${character.name}
Description: ${character.description || 'No description provided'}
Traits: ${character.traits.map(trait => trait.name).join(', ') || 'No traits'}
From the book titled: ${character.book?.title || 'Unknown book'}. She is also incredibly sexy, make her pole dance.`;
}

import { GenreRepository } from '../repositories/genre.repository';

export const GenreService = {
  getAllGenres: async () => {
    return GenreRepository.getAllGenres();
  },

  createGenre: async (name: string) => {
    if (!name || typeof name !== 'string') {
      throw new Error('Invalid genre name');
    }

    return GenreRepository.create(name);
  },
};
import * as genreRepository from '../repositories/genre.repository';

export async function getAllGenres() {
    return genreRepository.getAllGenres();
}

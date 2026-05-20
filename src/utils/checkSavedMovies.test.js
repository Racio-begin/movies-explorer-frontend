import { isMovieSaved, getMovieMyId } from './checkSavedMovies';

const catalogMovie = { id: 42, nameRU: 'Тест' };

const savedMovies = [
	{ _id: 'abc', movieId: 42, nameRU: 'Тест' },
	{ _id: 'def', movieId: 99, nameRU: 'Другой' },
];

describe('isMovieSaved', () => {
	it('возвращает true, если фильм есть среди сохранённых', () => {
		expect(isMovieSaved(catalogMovie, savedMovies)).toBe(true);
	});

	it('возвращает false, если фильма нет среди сохранённых', () => {
		expect(isMovieSaved({ id: 1 }, savedMovies)).toBe(false);
	});

	it('возвращает false для пустого списка сохранённых', () => {
		expect(isMovieSaved(catalogMovie, [])).toBe(false);
	});
});

describe('getMovieMyId', () => {
	it('возвращает _id сохранённого фильма по id каталога', () => {
		expect(getMovieMyId(catalogMovie, savedMovies)).toBe('abc');
	});

	it('возвращает undefined, если фильм не сохранён', () => {
		expect(getMovieMyId({ id: 1 }, savedMovies)).toBeUndefined();
	});
});

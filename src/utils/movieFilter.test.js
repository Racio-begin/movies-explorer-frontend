import movieFilter from './movieFilter';

const longMovie = { nameRU: 'Большой фильм', nameEN: 'Big Movie', duration: 120 };
const shortMovie = { nameRU: 'Короткий ролик', nameEN: 'Short Clip', duration: 30 };

describe('movieFilter', () => {
	it('находит фильм по подстроке в русском названии', () => {
		expect(movieFilter(longMovie, 'большой', false)).toBe(true);
	});

	it('находит фильм по подстроке в английском названии', () => {
		expect(movieFilter(longMovie, 'movie', false)).toBe(true);
	});

	it('игнорирует регистр в строке поиска', () => {
		expect(movieFilter(longMovie, 'БОЛЬШОЙ', false)).toBe(true);
	});

	it('возвращает false, если совпадений нет', () => {
		expect(movieFilter(longMovie, 'комедия', false)).toBe(false);
	});

	it('с флагом короткометражек отсеивает длинные фильмы', () => {
		expect(movieFilter(longMovie, 'фильм', true)).toBe(false);
	});

	it('с флагом короткометражек оставляет короткие фильмы', () => {
		expect(movieFilter(shortMovie, 'ролик', true)).toBe(true);
	});

	it('без флага короткометражек оставляет длинные фильмы', () => {
		expect(movieFilter(longMovie, 'фильм', false)).toBe(true);
	});
});

// Смотрим, есть ли фильм в сохраненных
function isMovieSaved(testMovie, savedMovies) {
	return savedMovies.some((item) => { return item.movieId === testMovie.id });
};

// Возвращаем _id (в нашем api) для фильма по переданному id ( в api beatfilms )
function getMovieMyId(testMovie, savedMovies) {
	let result;
	savedMovies.forEach((item) => { if (item.movieId === testMovie.id) { result = item._id } });
	return result;
};

export {
	isMovieSaved,
	getMovieMyId,
};
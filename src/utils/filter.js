import { SHORT_MOVIE_DURATION } from './constants';

const filter = (movies, search, isShort) => {
  return movies.filter((movie) => {
    const matchedSearch =
      movie.nameRU.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
      movie.nameEN.trim().toLowerCase().includes(search.trim().toLowerCase());

    return isShort ? movie.duration <= SHORT_MOVIE_DURATION && matchedSearch : matchedSearch;
  });
};

export default filter;
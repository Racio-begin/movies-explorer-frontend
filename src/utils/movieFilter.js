import { SHORT_MOVIE_DURATION } from './constants';

// const filter = (movies, search, isShort) => {
//   return movies.filter((movie) => {
//     const matchedSearch =
//       movie.nameRU.trim().toLowerCase().includes(search.trim().toLowerCase()) ||
//       movie.nameEN.trim().toLowerCase().includes(search.trim().toLowerCase());

//     return isShort ? movie.duration <= SHORT_MOVIE_DURATION && matchedSearch : matchedSearch;
//   });
// };

function movieFilter(item, searchString, onlyShortMovies) {
  return (
    (
      item.nameRU.toLowerCase().includes(searchString.toLowerCase()) || 
      item.nameEN.toLowerCase().includes(searchString.toLowerCase())
    ) &&
    (
      onlyShortMovies === false || item.duration <= SHORT_MOVIE_DURATION
    )
  );
}

// export default filter;
export default movieFilter;
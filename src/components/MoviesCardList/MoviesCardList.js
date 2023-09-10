import { useLocation } from 'react-router-dom';

import MoviesCard from "../MoviesCard/MoviesCard";
import Preloader from '../Preloader/Preloader';

import './MoviesCardList.css';

import {
	EMPTY_INPUT_MESSAGE,
	MOVIES_NOT_FOUND_MESSAGE,
	EMPTY_SAVED_SHORTS_MOVIES,
	EMPTY_SAVED_MOVIES,
} from '../../utils/informMessages';

function MoviesCardList({
	serverResponseError,
	onSaveMovie,
	onDeleteMovie,
	filteredMoviesArray,
	onClick,
	isHideButton,
	searchString,
	isShortMovies,
	isLoading,
	searchMoviesError,
}) {

	const location = useLocation();

	//   function showSearchInputError() {
	//   if (location.pathname === '/movies') {
	//     setSearchMoviesError(EMPTY_INPUT_MESSAGE);
	//   } else if (location.pathname === '/saved-movies') {
	//     setSearchSavedMoviesError(EMPTY_INPUT_MESSAGE);
	//   }
	// }

	// Запрашиваем последнюю поисковую строку из localStorage
	const lastSearchString = JSON.parse(localStorage.getItem("lastSearchString"));

	const getSearchErrorText = () => {
		if (
			location.pathname === '/movies' &&
			searchMoviesError
		) {
			filteredMoviesArray = ([]);
			return EMPTY_INPUT_MESSAGE;
		}

		// if (searchString.trim() === '') {
		//   return EMPTY_INPUT_MESSAGE;
		// }

		// if (searchString === '') {
		// 	alert(EMPTY_INPUT_MESSAGE);

		// 	return;
		// };

		if (
			location.pathname === '/movies' &&
			serverResponseError !== ''
		) {
			return serverResponseError;
		};

		if (
			location.pathname === '/movies' &&
			filteredMoviesArray.length === 0 &&
			lastSearchString === null
		) {
			return EMPTY_INPUT_MESSAGE;
		};

		if (
			location.pathname === '/movies' &&
			lastSearchString !== ''
		) {
			return MOVIES_NOT_FOUND_MESSAGE;
		};

		if (
			location.pathname === '/saved-movies' &&
			searchString !== ''
		) {
			return MOVIES_NOT_FOUND_MESSAGE;
		};

		if (
			location.pathname === '/saved-movies' &&
			filteredMoviesArray.length === 0 &&
			isShortMovies
		) {
			return EMPTY_SAVED_SHORTS_MOVIES;
		};

		if (
			location.pathname === '/saved-movies' &&
			filteredMoviesArray.length === 0
		) {
			return EMPTY_SAVED_MOVIES;
		};

		return;
	};

	return (
		<section>
			{isLoading
				? <Preloader />
				: <>
					{filteredMoviesArray?.length === 0
						|| searchMoviesError
						? (
							<p className="movies-card-list__error-text">{getSearchErrorText()}</p>
						) : null}
					<ul className="movies-card-list__container ul">
						{filteredMoviesArray.map((movie, i) => {
							return (
								<MoviesCard
									key={movie.id}
									movie={movie}
									onSaveMovie={onSaveMovie}
									onDeleteMovie={onDeleteMovie}
								/>
							);
						})}
					</ul>

					{location.pathname === '/movies' && filteredMoviesArray.length !== 0 && !isHideButton ? (
						<div className="movies-card-list__more">
							<button
								className="movies-card-list__more-button button"
								type="button"
								onClick={onClick}
							>
								Ещё
							</button>
						</div>
					) : null}
				</>
			}
		</section>
	);

};

export default MoviesCardList;
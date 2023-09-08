import { useLocation } from 'react-router-dom';

import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';

function MoviesCardList({
	serverResponseError,
	onSaveMovie,
	onDeleteMovie,
	filteredMoviesArray,
	onClick,
	isHideButton,
	searchString,
	isShortMovies,
}) {

	const location = useLocation();

	const lastSearchString = JSON.parse(localStorage.getItem("lastSearchString"))

	const getSearchErrorText = () => {
		if (location.pathname === '/movies' && serverResponseError !== "") {
			return serverResponseError;
		};

		if (
			location.pathname === '/movies' &&
			filteredMoviesArray.length === 0 &&
			lastSearchString === null
		) {
			return "Нужно ввести ключевое слово";
		};

		if (location.pathname === '/movies' && lastSearchString !== '') {
			return "Ничего не найдено";
		};

		if (location.pathname === '/saved-movies' && searchString !== '') {
			return "Ничего не найдено";
		};

		if (
			location.pathname === '/saved-movies' &&
			filteredMoviesArray.length === 0 &&
			isShortMovies
		) {
			return "Пока нет сохранённых короткометражных фильмов";
		};

		if (
			location.pathname === '/saved-movies' &&
			filteredMoviesArray.length === 0
		) {
			return "Пока нет сохранённых фильмов";
		};

		return;
	};

	return (
		<>
			{filteredMoviesArray?.length === 0 ? (
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
	);

};

export default MoviesCardList;
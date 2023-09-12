import { useState, useEffect } from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import movieFilter from '../../utils/movieFilter';

import MoviesApi from '../../utils/MoviesApi';

import {
	MOVIES_URL,
	getFullImageURL,
} from '../../utils/Url';

import {
	WINDOW_WIDTH_1280,
	WINDOW_WIDTH_768,
	INITIAL_CARDS_L_SIZE,
	ADDING_CARDS_L_SIZE,
	INITIAL_CARDS_M_SIZE,
	ADDING_CARDS_M_SIZE,
	INITIAL_CARDS_S_SIZE,
	ADDING_CARDS_S_SIZE,
} from '../../utils/constants';

import {
	EMPTY_INPUT_MESSAGE,
	MOVIES_NOT_FOUND_MESSAGE,
	MOVIES_WELCOME,
	SERVER_ERROR_500,
} from '../../utils/informMessages';

import './Movies.css';

function Movies({
	menuActive,
	setMenuActive,
	loggedIn,
}) {

	const [isLoading, setIsLoading] = useState(false);

	const [serverResponseError, setServerResponseError] = useState(false);

	const [searchData, setSearchData] = useState({});

	const [maximunCardCount, setMaximunCardCount] = useState(getRenderMoviesOptions().initialCount);

	const [isEmptyInput, setIsEmptyInput] = useState(false);

	const [isFirstVisit, setIsFirstVisit] = useState(true);
	// const [isFirstVisit, setIsFirstVisit] = useState(localStorage.getItem('firstVisit') === 'true');

	const moviesApi = new MoviesApi(MOVIES_URL);

	function getRenderMoviesOptions() {
		const width = window.innerWidth
		let initialCount;
		let extraCount;

		if (width > WINDOW_WIDTH_1280) {
			initialCount = INITIAL_CARDS_L_SIZE;
			extraCount = ADDING_CARDS_L_SIZE;
		} else {
			if (width > WINDOW_WIDTH_768 && width <= WINDOW_WIDTH_1280) {
				initialCount = INITIAL_CARDS_M_SIZE;
				extraCount = ADDING_CARDS_M_SIZE;
			} else {
				initialCount = INITIAL_CARDS_S_SIZE;
				extraCount = ADDING_CARDS_S_SIZE;
			}
		} return { initialCount, extraCount };
	};

	useEffect(() => {
		const moviesSearchData = localStorage.getItem('MoviesSearchData');
		if (moviesSearchData) {
			setSearchData(JSON.parse(moviesSearchData));
		};
		setIsFirstVisit(localStorage.getItem('firstVisit', 'true'));
		// return isFirstVisit;
	}, []);

	function moviesToRender() {
		const result = (searchData.searchResult ?? []).slice(0, maximunCardCount);
		result.forEach((item) => {
			item.imageFull = getFullImageURL(item.image.url);
			item.thumbnailFull = getFullImageURL(item.image.formats.thumbnail.url);
			item.reactKey = item.id;
		});
		return result;
	}

	function actualizeMoviesSearchData(searchString, onlyShortMovies, allMovies) {
		const searchResult = allMovies.filter((item) => { return movieFilter(item, searchString, onlyShortMovies) });
		return { searchString, onlyShortMovies, searchResult, apiResult: allMovies };
	}

	function handleSearch(searchString, onlyShortMovies) {
		setMaximunCardCount(getRenderMoviesOptions().initialCount);
		const moviesSearchData = JSON.parse(localStorage.getItem('MoviesSearchData'));

		if (moviesSearchData) {
			const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, moviesSearchData.apiResult);
			localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
			setSearchData(newSearchData);
		} else {
			setServerResponseError(false);
			setIsLoading(true);
			moviesApi.getInitialMovies()
				.then((result) => {
					const newSearchData = actualizeMoviesSearchData(searchString, onlyShortMovies, result);
					localStorage.setItem('MoviesSearchData', JSON.stringify(newSearchData));
					setSearchData(newSearchData);
					if (!isFirstVisit) {
						setIsFirstVisit(true);
						localStorage.setItem('firstVisit', 'false');
						} else {
						localStorage.setItem('firstVisit', isFirstVisit);
						}
				})
				.catch((err) => {
					console.log(err);
					setServerResponseError(true);
				})
				.finally(() => setIsLoading(false));
		}
	}

	function handleShowMore() {
		setMaximunCardCount(maximunCardCount + getRenderMoviesOptions().extraCount);
	}

	// todo: переделать её в более адекватный вид
	// const getSearchErrorText = () => {
	// 	if (
	// 		searchMoviesError
	// 	) {
	// 		filteredMoviesArray = ([]);
	// 		return EMPTY_INPUT_MESSAGE;
	// 	}

	// 	if (
	// 		location.pathname === '/movies' &&
	// 		serverResponseError !== ''
	// 	) {
	// 		return serverResponseError;
	// 	};

	// 	if (
	// 		location.pathname === '/movies' &&
	// 		filteredMoviesArray.length === 0 &&
	// 		lastSearchString === null
	// 	) {
	// 		return EMPTY_INPUT_MESSAGE;
	// 	};

	// 	if (
	// 		location.pathname === '/movies' &&
	// 		lastSearchString !== ''
	// 	) {
	// 		return MOVIES_NOT_FOUND_MESSAGE;
	// 	};

	// 	if (
	// 		location.pathname === '/saved-movies' &&
	// 		searchString !== ''
	// 	) {
	// 		return MOVIES_NOT_FOUND_MESSAGE;
	// 	};

	// 	if (
	// 		location.pathname === '/saved-movies' &&
	// 		filteredMoviesArray.length === 0 &&
	// 		isShortMovies
	// 	) {
	// 		return EMPTY_SAVED_SHORTS_MOVIES;
	// 	};

	// 	if (
	// 		location.pathname === '/saved-movies' &&
	// 		filteredMoviesArray.length === 0
	// 	) {
	// 		return EMPTY_SAVED_MOVIES;
	// 	};

	// 	return;
	// };

	return (
		<div className="movies">

			<Header
				menuActive={menuActive}
				setMenuActive={setMenuActive}
				loggedIn={loggedIn}
			/>

			<main className="movies__wrapper">
				<SearchForm
					onSearch={handleSearch}
					searchString={searchData.searchString ?? ""}
					onlyShortMovies={searchData.onlyShortMovies ?? ""}
					viewMode="allMovies"
					isEmptyInput={isEmptyInput}
					onEmptyInput={setIsEmptyInput}
				/>

				{isLoading && <Preloader />}

				{(!isLoading) &&
					(isFirstVisit) &&
					moviesToRender().length === 0 &&
					<p className="movies-card-list__error-text">
						{MOVIES_NOT_FOUND_MESSAGE}
					</p>}

				{(!isLoading) &&
					(searchData.searchString ?? {}) &&
					(!isFirstVisit) &&
					moviesToRender().length === 0 &&
					<p className="movies-card-list__error-text">
						{MOVIES_WELCOME}
					</p>}

				{searchData.searchString === "" &&
					<p className="movies-card-list__error-text">
						{EMPTY_INPUT_MESSAGE}
					</p>}

				{serverResponseError &&
					<p className="movies-card-list__error-text">
						{SERVER_ERROR_500}
					</p>}

				{(!isLoading) &&
					(moviesToRender().length > 0) &&
					searchData.searchString !== "" &&
					<MoviesCardList
						movies={moviesToRender()}
						viewMode="allMovies"
					/>}

				{(!isLoading) &&
					((searchData.searchResult ?? []).length > maximunCardCount) &&
					searchData.searchString !== "" &&
					<div className="movies-card-list__more">
						<button
							className="movies-card-list__more-button button"
							type="button"
							onClick={handleShowMore}>
							Ещё
						</button>
					</div>
				}
			</main >

			<Footer />

		</div >
	);
};

export default Movies;
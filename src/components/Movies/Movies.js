import { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import filter from '../../utils/filter';

import {
	WINDOW_WIDTH_1280,
	WINDOW_WIDTH_768,
} from '../../utils/constants';

function Movies({
	menuActive,
	setMenuActive,
	loggedIn,
	onSearch,
	onSaveMovie,
	onDeleteMovie,
	setCombinedMoviesArray,
	serverResponseError,
}) {

	const [isShortMovies, setIsShortMovies] = useState(false);
	const [isHideButton, setIsHideButton] = useState(false);

	const [searchString, setSearchString] = useState('');

	const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);

	const [numberToRender, setNumberToRender] = useState(1);

	useEffect(() => {
		if (searchString !== '') {
			handleSubmitSearch(searchString, isShortMovies);
		}
	}, [isShortMovies]);

	useEffect(() => {
		onSearch()
			.then((combinedMoviesArray) => {
				setCombinedMoviesArray(combinedMoviesArray);
				const search = JSON.parse(localStorage.getItem('lastSearchString'));
				const isShort = JSON.parse(localStorage.getItem('isShortMovies'));
				const lastSearchResultArray = filter(
					combinedMoviesArray,
					search,
					isShort
				);
				setFilteredMoviesArray(lastSearchResultArray);
				setSearchString(search);
				setIsShortMovies(isShort);
			})
			.catch((err) => console.log(err));
	}, []);

	const handleSubmitSearch = (searchString, isShortMovies) => {
		setSearchString(searchString);
		localStorage.setItem('lastSearchString', JSON.stringify(searchString));
		onSearch()
			.then((combinedMoviesArray) => {
				setCombinedMoviesArray(combinedMoviesArray);
				const filteredMoviesArray = filter(
					combinedMoviesArray,
					searchString,
					isShortMovies
				);
				setFilteredMoviesArray(filteredMoviesArray);

				return filteredMoviesArray;
			})
			.catch((err) => console.log(err));

		return filteredMoviesArray;
	};

	const handleCheckBox = (e) => {
		setIsShortMovies(e.target.checked);
		localStorage.setItem('isShortMovies', e.target.checked);
	};

	useEffect(() => {
		setNumberToRender(() => getMoviesConfig().numberOnStart);
	}, []);

	const getMoviesConfig = () => {
		if (window.innerWidth < WINDOW_WIDTH_768) {
			return {
				numberOnStart: 5,
				numberToAdd: 2,
			};
		}
		if (window.innerWidth < WINDOW_WIDTH_1280) {
			return {
				numberOnStart: 8,
				numberToAdd: 2,
			};
		}
		if (window.innerWidth >= WINDOW_WIDTH_1280) {
			return {
				numberOnStart: 12,
				numberToAdd: 3,
			};
		}
	};

	useEffect(() => {
		if (filteredMoviesArray.length <= numberToRender) {
			return setIsHideButton(true);
		}
		setIsHideButton(false);
	}, [numberToRender, filteredMoviesArray, isShortMovies]);

	const handleMoreButton = () => {
		setNumberToRender((prevState) => prevState + getMoviesConfig().numberToAdd);
	};

	return (
		<div className="movies">

			<Header
				menuActive={menuActive}
				setMenuActive={setMenuActive}
				loggedIn={loggedIn}
			/>

			<main className="movies__wrapper">
				<SearchForm
					onSearch={handleSubmitSearch}
					isShortMovies={isShortMovies}
					onCheck={handleCheckBox}
					searchString={searchString}
				/>
				<MoviesCardList
					serverResponseError={serverResponseError}
					onSaveMovie={onSaveMovie}
					onDeleteMovie={onDeleteMovie}
					filteredMoviesArray={filteredMoviesArray.slice(0, numberToRender)}
					onClick={handleMoreButton}
					isHideButton={isHideButton}
				/>
			</main >

			<Footer />

		</div >
	);
};

export default Movies;
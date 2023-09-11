import { useState, useEffect } from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import filter from '../../utils/filter';

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

	const [isLoading, setIsLoading] = useState(false);

	const [searchString, setSearchString] = useState('');

	const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);

	const [numberToRender, setNumberToRender] = useState(1);

	const [searchMoviesError, setSearchMoviesError] = useState(false);

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

		// Если запрос пустой, то убираем карточки из блока резуьтатов и выводим информ. сообщение
		if (searchString?.trim() === '') {
			setSearchMoviesError(true);
			setCombinedMoviesArray([]);
			return;
		}
		else {
			setIsLoading(true);
			setSearchMoviesError(false);
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
				.catch((err) => console.log(err))
				.finally(() => setIsLoading(false));

			return filteredMoviesArray;
		}
	};

	const handleCheckBox = (e) => {
		setIsShortMovies(e.target.checked);
		localStorage.setItem('isShortMovies', e.target.checked);
	};

	useEffect(() => {
		setNumberToRender(getMoviesConfig().numberOnStart);
	}, [filteredMoviesArray]);

	const getMoviesConfig = () => {
		if (window.innerWidth < WINDOW_WIDTH_768) {
			return {
				numberOnStart: INITIAL_CARDS_S_SIZE,
				numberToAdd: ADDING_CARDS_S_SIZE,
			};
		}
		if (window.innerWidth < WINDOW_WIDTH_1280) {
			return {
				numberOnStart: INITIAL_CARDS_M_SIZE,
				numberToAdd: ADDING_CARDS_M_SIZE,
			};
		}
		if (window.innerWidth >= WINDOW_WIDTH_1280) {
			return {
				numberOnStart: INITIAL_CARDS_L_SIZE,
				numberToAdd: ADDING_CARDS_L_SIZE,
			};
		}
	};

	useEffect(() => {
		// Если число дополнительных фильмов меньше, чем оно задано, то спрятать кнопку "Еще"
		if (filteredMoviesArray.length <= numberToRender) {
			setIsHideButton(true);
		} else {
			setIsHideButton(false);
		}
	}, [numberToRender, filteredMoviesArray, isShortMovies]);

	const handleMoreButton = () => {
		setNumberToRender(prevState => prevState + getMoviesConfig().numberToAdd);
	};


	// useEffect(() => {
	// 	setNumberToRender(() => getMoviesConfig().numberOnStart);
	// }, []);

	// const getMoviesConfig = () => {
	// 	if (window.innerWidth < WINDOW_WIDTH_768) {
	// 		return {
	// 			numberOnStart: INITIAL_CARDS_S_SIZE,
	// 			numberToAdd: ADDING_CARDS_S_SIZE,
	// 		};
	// 	}
	// 	if (window.innerWidth < WINDOW_WIDTH_1280) {
	// 		return {
	// 			numberOnStart: INITIAL_CARDS_M_SIZE,
	// 			numberToAdd: ADDING_CARDS_M_SIZE,
	// 		};
	// 	}
	// 	if (window.innerWidth >= WINDOW_WIDTH_1280) {
	// 		return {
	// 			numberOnStart: INITIAL_CARDS_L_SIZE,
	// 			numberToAdd: ADDING_CARDS_L_SIZE,
	// 		};
	// 	}
	// };

	// // useEffect(() => {
	// // 	getMoviesConfig()
	// // 	setNumberToRender(getMoviesConfig.numberOnStart)
	// // }, [filteredMoviesArray]);

	// useEffect(() => {
	// 	// Если число дополнительных фильмов меньше, чем оно задано, то спрятать кнопку "Еще"
	// 	if (filteredMoviesArray.length <= numberToRender) {
	// 		return setIsHideButton(true);
	// 	}
	// 	setIsHideButton(false);
	// }, [numberToRender, filteredMoviesArray, isShortMovies]);

	// const handleMoreButton = () => {
	// 	setNumberToRender((prevState) => prevState + getMoviesConfig().numberToAdd);
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
					onSearch={handleSubmitSearch}
					isShortMovies={isShortMovies}
					onCheck={handleCheckBox}
					searchString={searchString}
				/>
				{isLoading ? <Preloader /> :
					<MoviesCardList
						serverResponseError={serverResponseError}
						onSaveMovie={onSaveMovie}
						onDeleteMovie={onDeleteMovie}
						filteredMoviesArray={filteredMoviesArray.slice(0, numberToRender)}
						onClick={handleMoreButton}
						isHideButton={isHideButton}
						isLoading={isLoading}
						searchMoviesError={searchMoviesError}
					/>
				}
			</main >

			<Footer />

		</div >
	);
};

export default Movies;
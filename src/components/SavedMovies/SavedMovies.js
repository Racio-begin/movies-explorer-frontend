import { useState, useEffect } from 'react';
import './SavedMovies.css';
import '../Movies/Movies';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import filter from '../../utils/filter';

function SavedMovies({
	menuActive,
	setMenuActive,
	loggedIn,
	onSearch,
	onDeleteMovie,
	combinedMoviesArray,
	setCombinedMoviesArray,
}) {
	const [isShortMovies, setIsShortMovies] = useState(false);

	const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);

	const [searchString, setSearchString] = useState('');

	// const [isLoading, setIsLoading] = useState(false);

	const [searchMoviesError, setSearchMoviesError] = useState(false);

	useEffect(() => {
		onSearch()
			.then((combinedMoviesArray) => {
				setCombinedMoviesArray(combinedMoviesArray);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		handleSubmitSearch(searchString, isShortMovies);
	}, [isShortMovies, combinedMoviesArray]);

	const handleSubmitSearch = (searchString, isShortMovies) => {

		// if (searchString?.trim() === '') {
		// 	setSearchMoviesError(true);
		// 	setCombinedMoviesArray([]);
		// 	return;
		// }
		// else {
			// setIsLoading(true);
			setSearchMoviesError(false);

			setSearchString(searchString);
			const onlySavedMoviesArray = combinedMoviesArray.filter(
				(movie) => movie._id !== ''
			);
			const filteredMoviesArray = filter(
				onlySavedMoviesArray,
				searchString,
				isShortMovies
			);
			setFilteredMoviesArray(filteredMoviesArray);
			return filteredMoviesArray;
		// }
	};

	const handleCheckBox = (e) => {
		setIsShortMovies(e.target.checked);
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
					onCheck={handleCheckBox}
					searchString={searchString}
					isShortMovies={isShortMovies}
				/>
				<MoviesCardList
					// isLoading={isLoading}
					onDeleteMovie={onDeleteMovie}
					filteredMoviesArray={filteredMoviesArray}
					searchString={searchString}
					isShortMovies={isShortMovies}
					searchMoviesError={searchMoviesError}
				/>
			</main >

			<Footer />

		</div>
	);

};

export default SavedMovies;
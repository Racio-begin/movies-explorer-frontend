import { useState, useEffect } from 'react';
import './SavedMovies.css';
import '../Movies/Movies';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import { filter } from '../../utils/constants';

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

			<main>
				<SearchForm
					onSearch={handleSubmitSearch}
					isShortMovies={isShortMovies}
					onCheck={handleCheckBox}
					searchString={searchString}
				/>
				<MoviesCardList
					isShortMovies={isShortMovies}
					onDeleteMovie={onDeleteMovie}
					filteredMoviesArray={filteredMoviesArray}
					searchString={searchString}
				/>
			</main >

			<Footer />

		</div>
	);

};

export default SavedMovies;
import { useState, useContext } from 'react';
import './SavedMovies.css';
import '../Movies/Movies';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import movieFilter from '../../utils/movieFilter';

import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

import {
	EMPTY_INPUT_MESSAGE,
	MOVIES_NOT_FOUND_MESSAGE,
} from '../../utils/informMessages';

function SavedMovies({
	menuActive,
	setMenuActive,
	loggedIn,
}) {

	const { savedMovies } = useContext(SavedMoviesContext);

	const [onlyShortMovies, setOnlyShortMovies] = useState(false);

	const [searchString, setSearchString] = useState('');

	const [isEmptyInput, setIsEmptyInput] = useState(false);

	function moviesToRender() {
		const result = savedMovies.filter((item) => { return movieFilter(item, searchString, onlyShortMovies) });
		result.forEach((item) => {
			item.imageFull = item.image;
			item.thumbnailFull = item.thumbnail;
			item.reactKey = item._id;
			item.id = item.movieId;
		}
		);
		return result;
	}

	function handleSearch(searchString, onlyShortMovies) {
		setSearchString(searchString);
		setOnlyShortMovies(onlyShortMovies);
	}

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
					viewMode="savedMovies"
					isEmptyInput={isEmptyInput}
					onEmptyInput={setIsEmptyInput}
				/>

				{moviesToRender().length === 0 &&
					<p className="movies-card-list__error-text">
						{MOVIES_NOT_FOUND_MESSAGE}
					</p>}

				{searchString === "" &&
					isEmptyInput &&
					<p className="movies-card-list__error-text">
						{EMPTY_INPUT_MESSAGE}
					</p>}

				{(moviesToRender().length > 0) &&
					// searchString !== "" &&
					<MoviesCardList
						movies={moviesToRender()}
						viewMode="savedMovies"
					/>}

			</main >

			<Footer />

		</div>
	);

};

export default SavedMovies;
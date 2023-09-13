import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { SHORT_MOVIE_DURATION } from '../../utils/constants';

import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

import { isMovieSaved } from '../../utils/checkSavedMovies';

import './MoviesCard.css';

function MoviesCard({
	movie,
	viewMode,
}) {

	const { savedMovies, toggleSaveHandler } = useContext(SavedMoviesContext);

	const getMovieDuration = () => {
		if (movie?.duration <= SHORT_MOVIE_DURATION)
			return `${movie?.duration}м`;

		const hours = movie?.duration / 60;
		const minutes = movie?.duration % 60;

		return `${hours.toFixed()}ч ${minutes}м`;
	};

	function getButtonClassName() {

		if (viewMode === "allMovies" && isMovieSaved(movie, savedMovies)) {
			return "card__like_active button";
		}

		if (viewMode === "savedMovies") {
			return "card__delete button";
		}

		return "card__like button";
	}

	function handleMovieSave() {
		toggleSaveHandler(movie);
	}

	return (
		<li className="card">
			<div className="card__image-container">
				<Link
					className="movies-card__link"
					to={movie.trailerLink}
					target="_blank"
				>
					<img
						className={`card__image`
						}
						src={movie.imageFull}
						alt="Rарточка с постером фильма"
					/>
				</Link>
				<button
					className={getButtonClassName()}
					onClick={handleMovieSave}
					type="button"
				/>
			</div>

			<div className="card__title-container">
				<h2 className="card__title" >
					{movie.nameRU}
				</h2>
				<div className="card__time">
					{getMovieDuration()}
				</div>
			</div>
		</li>
	)
};

export default MoviesCard;
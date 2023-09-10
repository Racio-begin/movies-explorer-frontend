import { useState } from 'react';
import {
	Link,
	useLocation,
} from 'react-router-dom';

import Preloader from '../Preloader/Preloader';

import { SHORT_MOVIE_DURATION } from '../../utils/constants';

import './MoviesCard.css';

function MoviesCard({
	movie,
	onSaveMovie,
	onDeleteMovie
}) {

	const location = useLocation();

	const checkIsMovieSaved = () => {
		if (movie._id !== '')
			return true;

		return false;
	};

	const [isLoading, setIsLoading] = useState(true);

	const getMovieDuration = () => {
		if (movie?.duration <= SHORT_MOVIE_DURATION)
			return `${movie?.duration}м`;

		const hours = movie?.duration / 60;
		const minutes = movie?.duration % 60;

		return `${hours.toFixed()}ч ${minutes}м`;
	};

	const handleBtnClick = () => {
		if (location.pathname === "/saved-movies") {
			return onDeleteMovie(movie._id);
		}

		if (checkIsMovieSaved()) {
			return onDeleteMovie(movie._id);
		}

		return onSaveMovie(movie);
	};

	const getBtnClassName = () => {
		if (location.pathname === "/saved-movies") {
			return "card__delete";
		}

		if (checkIsMovieSaved())
			return "card__like_active";

		return "card__like";
	};

	const handleImageLoading = (e) => {
		setIsLoading(false);
	};

	return (
		<li className="card">
			<div className="card__image-container">
				{/* <img
					className="card__image"
					src={link}
					alt={alt}
				/> */}
				<Link
					className="movies-card__link"
					to={movie.trailerLink}
					target="_blank"
				>
					{isLoading && <Preloader />}
					<img
						className={`card__image ${isLoading ? 'card__image_inactive' : ''}`}
						src={movie.image}
						alt="Rарточка с постером фильма"
						onLoad={handleImageLoading}
					/>
				</Link>
				<button
					// className="card__like"
					// className={ilLiked ? "card__like_active" : "card__like button"}
					className={getBtnClassName()}
					onClick={handleBtnClick}
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
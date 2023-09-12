import MoviesCard from "../MoviesCard/MoviesCard";

import './MoviesCardList.css';

function MoviesCardList({
	movies,
	viewMode
}) {

	return (
		<section className="movies-card-list__container ul">
			{movies.map((item) => (
				<MoviesCard
					key={item.reactKey}
					movie={item}
					viewMode={viewMode}
				/>
			))}
		</section >
	);

};

export default MoviesCardList;
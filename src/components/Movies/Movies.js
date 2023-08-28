import './Movies.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import image from '../../images/movies/img1.jpg';

function Movies() {

	return (
		<div className="movies">
			<Header />

			<div className="movies__search-container">

				<div className="movies__search">
					<input
						className="movies__search-input"
						type="search"
						placeholder="Фильм"
					/>
					<button
						className="movies__search-button"
						type="submit"
					/>
				</div>

				<div className="movies__filter">
					<input
						className="movies__check-box"
						type="checkbox"
					/>
					<p className="movies__span">Короткометражки</p>
				</div>

			</div>

			<ul className="movies__container">
				<Card
					title="Босиком по галактике"
					link={image}
					alt="Карточка"
					time="1ч 50м"
				/>
				<Card
					title="Босиком по галактике"
					link={image}
					alt="Карточка"
					time="1ч 50м"
				/>
				<Card
					title="Босиком по галактике"
					link={image}
					alt="Карточка"
					time="1ч 50м"
				/>
				<Card
					title="Босиком по галактике"
					link={image}
					alt="Карточка"
					time="1ч 50м"
				/>
			</ul>

			<div className="movies__more">
				<button className="movies__more-button">
					Ещё
				</button>
			</div>

			<Footer />
		</div>
	);
};

export default Movies;
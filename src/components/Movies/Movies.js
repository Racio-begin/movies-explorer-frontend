import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import image from '../../images/movies/img1.jpg';

function Movies() {

	return (
		<div className="movies">
			<Header />
			<SearchForm />

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
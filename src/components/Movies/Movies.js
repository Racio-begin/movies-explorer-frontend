import './Movies.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import Card from '../Card/Card';
import image from '../../images/movies/img1.jpg';
// import Preloader from '../Preloader/Preloader';

function Movies() {

	return (
		<div className="movies">
			<Header />
			<SearchForm />
			{/* <Preloader/> */}

			<ul className="movies__container">
				<Card
					title="Босиком по галактике"
					link={image}
					alt="Превью первой карточки"
					time="1ч 50м"
				/>
				<Card
					title="Босиком по галактике. Часть вторая"
					link={image}
					alt="Превью второй карточки"
					time="1ч 51м"
				/>
				<Card
					title="Босиком по галактике. Часть последняя"
					link={image}
					alt="Превью третьей карточки"
					time="1ч 52м"
				/>
				<Card
					title="Босиком по галактике. Пролог"
					link={image}
					alt="Превью четвертой карточки"
					time="1ч 53м"
				/>
			</ul>

			<div className="movies__more">
				<button className="movies__more-button button">
					Ещё
				</button>
			</div>

			<Footer />
		</div>
	);
};

export default Movies;
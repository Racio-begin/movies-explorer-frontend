import './SavedMovies.css';
import '../Movies/Movies';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import image from '../../images/movies/img1.jpg';

function SavedMovies({ loggedIn }) {

	return (
		<div className="movies">

			<Header
				loggedIn={loggedIn}
			/>

			<main>

				<SearchForm />

				<section className="movies__list">

					<ul className="movies__container ul">
						<li className="card">
							<div className="card__image-container">
								<img
									className="card__image"
									src={image}
									alt="Превью соохраненной карточки"
								/>
								<button
									className="card__delete button"
									type="submit"
								/>
							</div>
							<div className="card__title-container">
								<h3 className="card__title" >
									33 слова про дизайнеров
								</h3>
								<div className="card__time">
									33м
								</div>
							</div>
						</li>
					</ul>

					<div className="movies__more">
						<button
							className="movies__more-button button"
							type="button">
							Ещё
						</button>
					</div>
				</section>
			</main>

			<Footer />

		</div>
	);

};

export default SavedMovies;
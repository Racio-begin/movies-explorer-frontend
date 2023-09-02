import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {

	const navigate = useNavigate();

	return (
		<main className="page-404">
			<section className="page-404__container">
				<h1 className="page-404__title">404</h1>
				<p className="page-404__subtitle">Страница не найдена</p>
			</section>
			<button
				className="page-404__back-button button"
				onClick={() => navigate(-1)}
				type="button">
				Назад
			</button>
		</main>
	);
};

export default PageNotFound;
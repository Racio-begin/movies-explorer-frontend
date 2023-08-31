import './PageNotFound.css';
import { useNavigate } from "react-router-dom";

function PageNotFound() {

	const navigate = useNavigate();

	return (
		<main className="page-404">
			<div className="page-404__container">
				<h2 className="page-404__title">404</h2>
				<p className="page-404__subtitle">Страница не найдена</p>
			</div>
			<button
				className="page-404__back-button button"
				onClick={() => navigate(-1)}
			>Назад
			</button>
		</main>
	);
};

export default PageNotFound;
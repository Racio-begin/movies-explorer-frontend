import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import './BurgerMenu.css';

function BurgerMenu({ setMenuActive }) {

	return (
		<div className="burger" onClick={() => setMenuActive(false)}>

			<div
				className="burger__overlay"
			/>

			<div className="burger__container" onClick={e => e.stopPropagation()}>

				<div className="burger__links">
					<Link className="burger__link link" to="/">Главная</Link>
					<Link className="burger__link link" to="/movies">Фильмы</Link>
					<Link className="burger__link link" to="/saved-movies">Сохранённые фильмы</Link>
				</div>
				<ProfileButton />

			</div>

		</div>
	);
};

export default BurgerMenu;
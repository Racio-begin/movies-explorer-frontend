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
				<ul className="burger__links ul">

					<li>
						<Link className="burger__link link" to="/">Главная</Link>
					</li>

					<li>
						<Link className="burger__link link" to="/movies">Фильмы</Link>
					</li>

					<li>
						<Link className="burger__link link" to="/saved-movies">Сохранённые фильмы</Link>
					</li>

				</ul>
				<ProfileButton />
			</div>

		</div>
	);
};

export default BurgerMenu;
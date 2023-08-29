import { Link } from 'react-router-dom';
import ProfileButton from '../ProfileButton/ProfileButton';
import './BurgerMenu.css';

function BurgerMenu() {

	return (
		<div className="burger">
			<div className="burger__container">
				{/* <button
					className="burger__close-button"
					onClick={handleClose}
				/> */}
				<Link className="burger__link" to="/">Главная</Link>
				<Link className="burger__link" to="/movies">Фильмы</Link>
				<Link className="burger__link" to="/saved-movies">Сохранённые фильмы</Link>
			</div>
			<ProfileButton />
		</div>
	);
};

export default BurgerMenu;
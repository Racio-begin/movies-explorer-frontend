import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Logo.css'

function Logo() {
	return (
		<Link>
			<img
				className="header__logo"
				src={logo}
				alt="Логотип сайта Giga-movies"
			/>
		</Link>
	)
};

export default Logo;
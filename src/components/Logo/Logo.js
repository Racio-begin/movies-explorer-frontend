import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Logo.css'

function Logo() {
	return (
		<Link to="/" className="logo button">
			<img
				src={logo}
				alt="Логотип сайта Giga-movies"
			/>
		</Link>
	)
};

export default Logo;
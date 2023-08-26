import { Link } from "react-router-dom";
import logo from '../../images/logo.svg';
import './Logo.css'

function Logo() {
	return (
		<Link className="logo">
			<img
				src={logo}
				alt="Логотип сайта Giga-movies"
			/>
		</Link>
	)
};

export default Logo;
import React from "react";
import { Link } from "react-router-dom";
import './NavTab.css';

function NavTab({ }) {

	return (
		<div className="navtab">

{/* Отработать работоспособность ссылок (переход в рамках страницы, плавный переход) */}
			<Link
				className="navtab__link"
				to="about"
				smooth={true}
				duration={500}>
				О проекте
			</Link>

			<Link
				className="navtab__link"
				to="techs"
				smooth={true}
				duration={500}>
				Технологии
			</Link>

			<Link
				className="navtab__link"
				to="about-me"
				smooth={true}
				duration={500}>
				Студент
			</Link>

		</div>
	);

};

export default NavTab;
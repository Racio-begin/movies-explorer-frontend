import React from "react";
import { Link } from "react-router-dom";
import './NavTab.css';

function NavTab() {

	return (
		<div className="navtab">

{/* Отработать работоспособность ссылок (переход в рамках страницы, плавный переход) */}
			<Link
				to="about-projects"
				className="navtab__link"
				// smooth={true}
				// duration={500}
				>О проекте
			</Link>

			<Link
				to="techs"
				className="navtab__link"
				// smooth={true}
				// duration={500}
				>Технологии
			</Link>

			<Link
				to="about-me"
				className="navtab__link"
				// smooth={true}
				// duration={500}
				>Студент
			</Link>

		</div>
	);

};

export default NavTab;
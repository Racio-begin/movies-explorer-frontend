import React from "react";
import { Link } from "react-router-dom";
import './NavTab.css';
import '../common/animation-transition.css';

function NavTab() {

	return (
		<div className="navtab">
			<a
				href="#about-projects"
				className="navtab__link animation-transition"
			>О проекте
			</a>
			<a
				href="#techs"
				className="navtab__link animation-transition"
			>Технологии
			</a>
			<a
				href="#about-me"
				className="navtab__link animation-transition"
			>Студент
			</a>
		</div>
	);

};

export default NavTab;
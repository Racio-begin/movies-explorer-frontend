import './Portfolio.css';
import ProjectLink from '../ProjectLink/ProjectLink';

function Portfolio() {

	return (
		<section className="portfolio">
			<h3 className="portfolio__title">Портфолио</h3>
			<ul className="portfolio__projects ul">
				<ProjectLink
					className="project-link link project-link_active-border"
					linkName="Статичный сайт"
					linkProject="https://github.com/Racio-begin/how-to-learn"
				/>
				<ProjectLink
					className="project-link link project-link_active-border"
					linkName="Адаптивный сайт"
					linkProject="https://giga-mesto.nomoredomains.xyz"
				/>
				<ProjectLink
					className="project-link link"
					linkName="Одностраничное приложение"
					linkProject="https://github.com/Racio-begin/russian-travel"
				/>
			</ul>
		</section>
	);
};

export default Portfolio;
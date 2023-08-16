import './AboutProjects.css';

function AboutProjects({ }) {

	return (
		<div className="about-projects">
			<div className="about-projects__title">О проекте</div>
			<div className="about-projects__description">

				<div className="about-projects__description_container">
					<div className="about-projects__description_title">Дипломный проект включал 5 этапов</div>
					<div className="about-projects__description_content">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</div>
				</div>

				<div className="about-projects__description_container">
					<div className="about-projects__description_title">На выполнение диплома ушло 5 недель</div>
					<div className="about-projects__description_content">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
				</div>
			</div>

			<div className="about-projects__study-time"></div>
		</div>
	);
};

export default AboutProjects;
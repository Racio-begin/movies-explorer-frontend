import './AboutProjects.css';

function AboutProjects({ }) {

	return (
		<div className="about-projects">
			<div className="about-projects__title">О проекте</div>
			<div className="about-projects__description">

				<div className="about-projects__description_container">
					<div className="about-projects__description_title">Дипломный проект включал 5&nbsp;этапов</div>
					<div className="about-projects__description_content">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</div>
				</div>

				<div className="about-projects__description_container">
					<div className="about-projects__description_title">На&nbsp;выполнение диплома ушло 5&nbsp;недель</div>
					<div className="about-projects__description_content">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</div>
				</div>

			</div>

			<div className="about-projects__study-time"></div>
		</div>
	);
};

export default AboutProjects;
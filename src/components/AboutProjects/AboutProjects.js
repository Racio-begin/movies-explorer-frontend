import './AboutProjects.css';

function AboutProjects() {

	return (
		<div className="about-projects">

			<h2 className="about-projects__title">О проекте</h2>

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

			<div className="about-projects__study-time">
				<h3 className="about-projects__study-time-title about-projects__study-time_title_green">1 неделя</h3>
				<h3 className="about-projects__study-time-title about-projects__study-time_title_gray">4 недели</h3>
				<p className="about-projects__study-time-content">Back-end</p>
				<p className="about-projects__study-time-content">Front-end</p>
			</div>

		</div>
	);
};

export default AboutProjects;
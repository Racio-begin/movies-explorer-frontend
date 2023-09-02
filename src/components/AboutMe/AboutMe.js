import Portfolio from '../Portfolio/Portfolio';
import Student from '../Student/Student';
import './AboutMe.css';

function AboutMe() {

	return (
		<section className="about-me" id="about-me">
			<h2 className="about-me__title">Студент</h2>
			<Student />
			<Portfolio />
		</section>
	);
};

export default AboutMe;
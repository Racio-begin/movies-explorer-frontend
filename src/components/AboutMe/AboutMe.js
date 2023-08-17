import Portfolio from '../Portfolio/Portfolio';
import Student from '../Student/Student';
import './AboutMe.css';

function AboutMe() {

	return (
		<div className="about-me" id="about-me">
			<h2 className="about-me__title">Студент</h2>
			<Student />
			<Portfolio />
		</div>
	);
};

export default AboutMe;
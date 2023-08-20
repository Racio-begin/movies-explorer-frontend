import { Link } from 'react-router-dom';
import './ProjectLink.css';
import linkImg from '../../images/link_ing.svg'

function ProjectLink({ linkProject, linkName }) {

	return (
		<Link
			to={linkProject}
			className="project-link">
			<h4 className="project-link__link-name">{linkName}</h4>
			<img
				className="project-link__link-img"
				src={linkImg}
				alt="Изображение стрелочки-ссылки на сторонний ресурс" />
		</Link>
	);
};

export default ProjectLink;
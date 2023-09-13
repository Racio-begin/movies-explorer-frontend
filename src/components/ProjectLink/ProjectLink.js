import { Link } from 'react-router-dom';
import './ProjectLink.css';
import linkImg from '../../images/link_ing.svg'

function ProjectLink({ className, linkProject, linkName }) {

	return (
		<li>
			<Link
				to={linkProject}
				className={className}
				target="_blank"
			>
				<h4 className="project-link__link-name">{linkName}</h4>
				<img
					className="project-link__link-img"
					src={linkImg}
					alt="Изображение стрелочки-ссылки на сторонний ресурс" />
			</Link>
		</li>
	);

};

export default ProjectLink;
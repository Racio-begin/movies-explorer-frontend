import { Link } from 'react-router-dom';
import './Form.css';
import Logo from '../Logo/Logo';

function Form({
	title,
	buttonText,
	questionText,
	link,
	linkText,
	onSubmit,
	// onRegister,
	...props
}) {
	return (
		<section
			className="form"
			onSubmit={onSubmit}
		>
			<div className="form__header">
				<Logo />

				<h1 className="form__title">
					{title}
				</h1>
			</div>

			<form className="form__container">
				{props.children}

				<button
					className="form__button-submit button"
					type="submit"
				>
					{buttonText}
				</button>

			</form>
			<p className="form__redirect">
				{questionText}
				<Link
					className="form__redirect-link link"
					to={link}>
					{linkText}
				</Link>
			</p>

		</section>
	)
};

export default Form;
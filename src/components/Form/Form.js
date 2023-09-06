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
	isValid,
	isLocked,
	serverResponseError,
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

				<p className='form__submit-error'>{serverResponseError}</p>

				<button
					className="form__button-submit button "
					type="submit"
					disabled={!isValid || isLocked}
				>
					{buttonText}
				</button>

				<p className="form__redirect">
					{questionText}
					<Link
						className="form__redirect-link link"
						to={link}>
						{linkText}
					</Link>
				</p>

			</form>

		</section>
	)
};

export default Form;
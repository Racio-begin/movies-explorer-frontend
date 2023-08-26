import { Link } from 'react-router-dom';
import './Form.css';
import Logo from '../Logo/Logo';

function Form({ title, buttonText, ...props }) {
	return (
		<div className="form">
			<div className="form__header">
				<Logo />

				<h3 className="form__title">
					{title}
				</h3>
			</div>

			<form className="form__container">
				{props.children}
			</form>

			<button
				className="form__button-submit"
				type="submit">
				{buttonText}
			</button>

			<p className="form__redirect">Уже зарегистрированы?
				<Link
					className="form__redirect_link"
					to="/sign-in">
					Войти
				</Link>
			</p>

		</div>
	)
};

export default Form;
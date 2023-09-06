import { useEffect } from 'react';
import './Login.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

import { REGEX_EMAIL } from '../../utils/regex';
import { EMAIL_TITLE_TEXT } from '../../utils/constants';

import useFormWithValidation from '../../hooks/useFormWithValidation';

function Login({
	onLogin,
	isLocked,
	serverResponseError,
	setServerResponseError,
}) {

	useEffect(() => {
		setServerResponseError('');
	}, []);

	const { values, handleChange, errors, isValid } =
		useFormWithValidation();

	const handleLoginSubmit = (e) => {
		e.preventDefault();

		onLogin(
			values.email,
			values.password
		)
	};

	const handleChangeInput = (e) => {
		setServerResponseError('');
		handleChange(e);
	};

	return (
		<main>
			<Form
				title="Рады видеть!"
				buttonText="Войти"
				questionText="Ещё не зарегистрированы?"
				link="/signup"
				linkText=" Регистрация"
				onSubmit={handleLoginSubmit}
				isValid={isValid}
				isLocked={isLocked}
				serverResponseError={serverResponseError}
			>

				<FormLabel
					labelName="E-mail"
					type="email"
					inputName="email"
					id="email"
					value={values.email || ''}
					placeholder="Введите e-mail"
					minLength={5}
					maxLength={40}
					required={true}
					spanError={errors.email}
					regex={REGEX_EMAIL}
					titleText={EMAIL_TITLE_TEXT}
					onChange={handleChangeInput}
				/>

				<FormLabel
					labelName="Пароль"
					type="password"
					inputName="password"
					id="password"
					value={values.password || ''}
					placeholder="Введите пароль"
					minLength={5}
					maxLength={40}
					required={true}
					spanError={errors.password}
					onChange={handleChangeInput}
				/>

			</Form>
		</main>
	);
};

export default Login;
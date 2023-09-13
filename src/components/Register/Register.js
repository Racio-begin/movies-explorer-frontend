import { useEffect } from 'react';
import './Register.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

import { REGEX_EMAIL } from '../../utils/regex';
import { EMAIL_INFO_MESSAGE } from '../../utils/informMessages';

import useFormWithValidation from '../../hooks/useFormWithValidation';

function Register({
	onRegister,
	isLockedButton,
	serverResponseError,
	setServerResponseError,
}) {

	useEffect(() => {
		setServerResponseError('');
	}, []);

	const { values, handleChange, errors, isValid } =
		useFormWithValidation();

	const handleRegisterSubmit = (e) => {
		e.preventDefault();

		onRegister(
			values.name,
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
				title="Добро пожаловать!"
				buttonText="Зарегистрироваться"
				questionText="Уже зарегистрированы?"
				link="/signin"
				linkText=" Войти"
				onSubmit={handleRegisterSubmit}
				isValid={isValid}
				isLockedButton={isLockedButton}
				serverResponseError={serverResponseError}
			>

				<FormLabel
					labelName="Имя"
					type="text"
					inputName="name"
					id="name"
					value={values.name}
					placeholder="Введите имя"
					minLength={2}
					maxLength={40}
					required={true}
					spanError={errors.name}
					onChange={handleChangeInput}
				/>

				<FormLabel
					labelName="E-mail"
					type="email"
					inputName="email"
					id="email"
					value={values.email}
					placeholder="Введите e-mail"
					minLength={5}
					maxLength={40}
					required={true}
					spanError={errors.email}
					pattern={REGEX_EMAIL}
					titleText={EMAIL_INFO_MESSAGE}
					onChange={handleChangeInput}
				/>

				<FormLabel
					labelName="Пароль"
					type="password"
					inputName="password"
					id="password"
					value={values.password}
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

export default Register;
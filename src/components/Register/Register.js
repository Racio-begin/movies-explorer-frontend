import './Register.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Register({ }) {

	return (
		<Form
			title="Добро пожаловать!"
			buttonText="Зарегистрироваться"
			questionText="Уже зарегистрированы?"
			link="/sign-in"
			linkText=" Войти"
		>

			<FormLabel
				labelName="Имя"
				type="text"
				inputName="username"
				id="username"
				placeholder=""
				minLength={2}
				maxLength={40}
				required={true}
				spanMessage='Заполните поле "Имя"'
			/>

			<FormLabel
				labelName="E-mail"
				type="email"
				inputName="email"
				id="user-email"
				placeholder=""
				minLength={5}
				maxLength={40}
				required={true}
				spanMessage='Адрес электронной почты должен содержать символ "@".'
			/>

			<FormLabel
				labelName="Пароль"
				type="password"
				inputName="password"
				id="user-password"
				placeholder=""
				minLength={5}
				maxLength={40}
				required={true}
				spanMessage='Заполните поле "Пароль"'
			/>

		</Form>
	);
};

export default Register;
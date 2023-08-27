import './Login.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Login({ }) {

	return (
		<Form
			title="Рады видеть!"
			buttonText="Войти"
			questionText="Ещё не зарегистрированы?"
			link="/sign-up"
			linkText=" Регистрация"
		>

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

export default Login;
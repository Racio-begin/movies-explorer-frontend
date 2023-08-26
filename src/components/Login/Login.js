import './Login.css';
import Form from '../Form/Form';
import FormLabel from '../FormLabel/FormLabel';

function Login({ }) {

	return (
		<Form
			title="Рады видеть!"
			buttonText="Войти"
			questionText="Ещё не зарегистрированы?"
			linkText=" Регистрация"
			link="/sign-up"
		>

			<FormLabel
				labelName="Имя"
				spanMessage='Заполните поле "Имя"'
			/>

			<FormLabel
				labelName="E-mail"
				spanMessage='Адрес электронной почты должен содержать символ "@".'
			/>

			<FormLabel
				labelName="Пароль"
				spanMessage='Заполните поле "Пароль"'
			/>

		</Form>
	);
};

export default Login;
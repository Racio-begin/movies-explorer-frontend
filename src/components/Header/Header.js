import { useState } from 'react';

import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


import './Header.css';

function Header({ loggedIn, setLoggedIn }) {

	const [menuActive, setMenuActive] = useState(false);

	// const handleLogin = (userData) => {
	// 	const { email, password } = userData;
	// 	Auth.login({ email, password })
	// 		.then((data) => {
	// 			localStorage.setItem('jwt', data.token);
	// 			api.setToken(data.token);
	// 			setLoggedIn(true);
	// 			setUserData({ email, password });
	// 			navigate('/mesto');
	// 		})
	// 		.catch(() => {
	// 			setIsInfoTooltipOpen(true);
	// 			setSuccessInfoTooltip({
	// 				image: false,
	// 				text: "Что-то пошло не так! Попробуйте ещё раз."
	// 			});
	// 			console.error(`Войти в аккаунт, App`);
	// 		})
	// };

	// const handleRegister = (userData) => {
	// 	const { email, password } = userData;
	// 	Auth.register({ email, password })
	// 		.then(res => {
	// 			setIsInfoTooltipOpen(true);
	// 			setSuccessInfoTooltip({
	// 				image: true,
	// 				text: "Вы успешно зарегистрировались!"
	// 			});
	// 			navigate('/sign-in')
	// 		})
	// 		.catch(() => {
	// 			setIsInfoTooltipOpen(true);
	// 			setSuccessInfoTooltip({
	// 				image: false,
	// 				text: "Что-то пошло не так! Попробуйте ещё раз."
	// 			});
	// 			console.error(`Зарегистрировать аккаунт, App`);
	// 		})
	// };

	// const handleCheckToken = () => {
	// 	if (token) {
	// 		Auth.checkToken(token)
	// 			.then((res) => {
	// 				if (!res) {
	// 					return
	// 				};

	// 				setLoggedIn(true);
	// 				api.setToken(token);
	// 				setUserData({ email: res.email });
	// 				navigate("/mesto", { replace: true });
	// 			})
	// 			.catch(() => {
	// 				setLoggedIn(false)
	// 				console.error(`Проверить jwt-токен на валидность, App`);
	// 			})
	// 	};
	// };

	// function handleSignOut() {
	// 	localStorage.removeItem('jwt');
	// 	setLoggedIn(false);
	// 	navigate('/sign-in');
	// };

	return (
		// <div className="header open">
		<header className={menuActive ? "header open" : "header"}>
			<Logo />
			<Navigation
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				menuActive={menuActive}
				setMenuActive={setMenuActive}
			/>
		</header>
	);
};

export default Header;
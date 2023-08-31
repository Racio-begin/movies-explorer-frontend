import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isLoading = true, ...props }) => {

	// if (isLoading) {
	// 	return (
	// 		<h1 className="loading">Loading...</h1>
	// 	);
	// };

	return props.loggedIn
		? <Component
			{...props}
		/>
		: <Navigate to="/signin"
			replace
		/>
};

export default ProtectedRoute
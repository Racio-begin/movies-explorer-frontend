import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
	element: Component,
	isLoading = true,
	...props }) => {

	return props.loggedIn
		? <Component
			{...props}
		/>
		: <Navigate to="/"
			replace
		/>
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ Component, ...props  }) {
//   if (props.loggedIn) {
//     return Component;
//   } else {
//     return (<Navigate to="/" replace/>);
//   } 
// }

// export default ProtectedRoute;
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			isAuthenticated ? <Component {...props} /> : <Redirect to='/' />
		)}
	/>
);

PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	component: PropTypes.func
};

export default PrivateRoute;

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ authenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			authenticated ? <Component {...props} /> : <Redirect to='/' />
		)}
	/>
);

PrivateRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	component: PropTypes.func
};

export default PrivateRoute;

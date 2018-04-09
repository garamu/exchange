import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ authenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			!authenticated ? <Component {...props} /> : <Redirect to='/dashboard' />
		)}
	/>
);

PublicRoute.propTypes = {
	authenticated: PropTypes.bool.isRequired,
	component: PropTypes.func
};

export default PublicRoute;

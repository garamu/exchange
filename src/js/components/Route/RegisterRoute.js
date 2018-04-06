import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isRegistered, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (
			!isRegistered ? <Component {...props} /> : <Redirect to='/' />
		)}
	/>
);

PublicRoute.propTypes = {
	isRegistered: PropTypes.bool.isRequired,
	component: PropTypes.func
};

export default PublicRoute;

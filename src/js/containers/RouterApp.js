import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/* eslint-disable*/
import Login from 'Components/Login/Login';
import Register from 'Components/Register/Register';
import NoMatch from 'Components/Route/NoMatch';
import Main from './Main/Main';
import PublicRoute from 'Components/Route/PublicRoute';
import PrivateRoute from 'Components/Route/PrivateRoute';
import RegisterRoute from 'Components/Route/RegisterRoute';
/* eslint-enable */


const RouterApp = ({ authenticated, checked, isRegistered }) => (
	<Router>
		<Switch>
			{ checked &&
				<PrivateRoute path='/dashboard' component={Main} authenticated={authenticated} />
			}
			<RegisterRoute path='/register' component={Register} isRegistered={isRegistered} />
			<PublicRoute path='/' component={Login} authenticated={authenticated} />
			<Route component={NoMatch} />
		</Switch>
	</Router>
);

function mapStateToProps(state) {
	// const { auth, register, session } = state;
	const { register, session } = state;
	// const { isAuthenticated } = auth;
	const { isRegistered } = register;
	const { checked, authenticated } = session;
	return {
		authenticated,
		isRegistered,
		checked
	};
}

RouterApp.propTypes = {
	authenticated: PropTypes.bool,
	checked: PropTypes.bool.isRequired,
	isRegistered: PropTypes.bool
};

export default connect(mapStateToProps)(RouterApp);

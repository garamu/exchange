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


const RouterApp = ({ isAuthenticated, isRegistered }) => (
	<Router>
		<Switch>
			<PublicRoute path='/login' component={Login} isAuthenticated={isAuthenticated} />
			<RegisterRoute exact path='/register' component={Register} isRegistered={isRegistered} />
			<PrivateRoute path='/dashboard' component={Main} isAuthenticated={isAuthenticated} />
			<Route component={NoMatch} />
		</Switch>
	</Router>
);

function mapStateToProps(state) {
	const { auth, register } = state;
	const { isAuthenticated } = auth;
	const { isRegistered } = register;
	return {
		isAuthenticated,
		isRegistered
	};
}

RouterApp.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	isRegistered: PropTypes.bool
};

export default connect(mapStateToProps)(RouterApp);

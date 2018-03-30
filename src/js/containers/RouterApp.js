import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

/* eslint-disable*/
import Login from 'Components/Login/Login';
import NoMatch from 'Components/Route/NoMatch';
import Main from './Main/Main';
import PublicRoute from 'Components/Route/PublicRoute';
import PrivateRoute from 'Components/Route/PrivateRoute';
/* eslint-enable */


const RouterApp = ({ isAuthenticated }) => (
	<Router>
		<Switch>
			<PublicRoute exact path='/' component={Login} isAuthenticated={isAuthenticated} />
			<PrivateRoute path='/dashboard' component={Main} isAuthenticated={isAuthenticated} />
			<Route component={NoMatch} />
		</Switch>
	</Router>
);

function mapStateToProps(state) {
	const { auth } = state;
	const { isAuthenticated } = auth;
	return {
		isAuthenticated
	};
}

RouterApp.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(RouterApp);

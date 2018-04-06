import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// eslint-disable-next-line
import { logout } from 'Actions/actions_auth';

// Component Styles
// import './Logout.scss';

class Logout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// Initialize states here..
		};
	}

	cancelLogout = (e) => {
		e.preventDefault();
		// this.props.dispatch(toggleLogout(false));
	}

	confirmLogout = (e) => {
		e.preventDefault();
		this.props.dispatch(logout());
	}

	render() {
		return (
			<div className='navbar-dropdown is-boxed'>
				{/* <p className='control'>
					<span><a onClick={this.cancelLogout}>Annulla</a></span>
				</p> */}
				<p className='control'>
					<span><a onClick={this.confirmLogout}>Conferma</a></span>
				</p>
			</div>
		);
	}
}

Logout.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default connect()(Logout);

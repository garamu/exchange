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
			<div className='exc-modal--logout modal is-active'>
				<div className='exc-modal__box box'>
					<div className='exc-modal__buttons'>
						<a className='exc-modal__btn--cancel button is-info' onClick={this.cancelLogout}>Annulla</a>
						<a className='exc-modal__btn--confirm button is-danger' onClick={this.confirmLogout}>Conferma</a>
					</div>
				</div>
			</div>
		);
	}
}

Logout.propTypes = {
	dispatch: PropTypes.func.isRequired
};

export default connect()(Logout);

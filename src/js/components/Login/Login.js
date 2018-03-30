import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint-disable */
import { login } from 'Actions/actions_auth';
import AuthError from '../Auth/AuthError';
/* eslint-enable */

// Component styles
// import './Login.scss';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			password: ''
		};
	}

	handleUser = (e) => {
		const userInput = e.target.value;
		this.setState({ user: userInput });
	};

	handlePassword = (e) => {
		const passwordInput = e.target.value;
		this.setState({ password: passwordInput });
	};

	handlelogin = (e) => {
		e.preventDefault();

		const credentials = {
			user: this.state.user,
			password: this.state.password
		};

		this.props.dispatch(login(credentials));
	};

	render() {
		const { errorMessage } = this.props;
		const { user, password } = this.state;

		return (
			<div className='exc-login'>
				<div className='exc-login__title'>
					<span className='exc-login__logo'></span>
					<h3>Login</h3>
				</div>
				<form className='exc-login__wrapper'>
					<div className='exc-input__wrapper'>
						<input
							onChange={this.handleUser}
							id='dynamic-label-user'
							className='input is-medium'
							type='text'
							placeholder='User'
							value={user}
							required
						/>{
							// eslint-disable-next-line
						}<label htmlFor='dynamic-label-user'>User</label>
					</div>
					<div className='exc-input__wrapper'>
						<input
							onChange={this.handlePassword}
							id='dynamic-label-password'
							className='input is-medium'
							type='password'
							placeholder='Password'
							value={password}
							required
						/>{
							// eslint-disable-next-line
						}<label htmlFor='dynamic-label-password'>Password</label>
					</div>
					<button
						type='submit'
						className='exc-login__btn button is-info is-medium'
						onClick={this.handlelogin}
					>Entra
					</button>
					{errorMessage &&
						<AuthError errorMsg={errorMessage} />
					}
				</form>
			</div>
		);
	}
}

Login.propTypes = {
	dispatch: PropTypes.func.isRequired,
	errorMessage: PropTypes.string
};

function mapStateToProps(state) {
	const { auth } = state;
	const { errorMessage } = auth;

	return {
		errorMessage
	};
}

export default connect(mapStateToProps)(Login);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint-disable */
import { login } from 'Actions/actions_auth';
import { registerInitState } from 'Actions/actions_register';
import AuthError from '../Auth/AuthError';
/* eslint-enable */
import people from './assets/people_anonymous.gif';
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
	componentDidMount = () => {
		this.props.dispatch(registerInitState(false));
	};
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
			username: this.state.user,
			password: this.state.password
		};

		this.props.dispatch(login(credentials));
	};

	render() {
		const { errorMessage } = this.props;
		const { user, password } = this.state;

		return (

			<section className='hero is-fullheight'>
				<div className='hero-body'>
					<div className='container has-text-centered'>
						<div className='column is-4 is-offset-4'>
							<h3 className='title has-text-grey'>Login</h3>
							<p className='subtitle has-text-grey'>Please login to proceed.</p>
							<div className='box'>
								<figure className='avatar'>
									<img src={people} alt='' />
								</figure>
								<form>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handleUser}
												className='input is-large'
												type='email'
												value={user}
												placeholder='Username'
												required
											/>
										</div>
									</div>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handlePassword}
												className='input is-large'
												type='password'
												value={password}
												required
												placeholder='Your Password'
											/>
										</div>
									</div>
									<button
										type='submit'
										onClick={this.handlelogin}
										className='button is-block is-info is-large is-fullwidth'
									>
										Login
									</button>
									{errorMessage &&
										<AuthError errorMsg={errorMessage} />
									}
								</form>
							</div>
							<p className='has-text-grey'>
								<Link to='/register'>Sign Up</Link>&nbsp;·&nbsp;
							</p>
						</div>
					</div>
				</div>
			</section>
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

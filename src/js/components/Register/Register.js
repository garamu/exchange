import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/* eslint-disable */
import { register } from 'Actions/actions_register';
import AuthError from '../Auth/AuthError';
/* eslint-enable */
// Component styles
// import './Register.scss';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			submitted: false
		};
	}

	handleUsername = (e) => {
		const usernameInput = e.target.value;
		this.setState({ username: usernameInput });
	};

	handlePassword = (e) => {
		const passwordInput = e.target.value;
		this.setState({ password: passwordInput });
	};
	handleFirstName = (e) => {
		const firstNameInput = e.target.value;
		this.setState({ firstName: firstNameInput });
	};
	handleLastName = (e) => {
		const lastNameInput = e.target.value;
		this.setState({ lastName: lastNameInput });
	};
	handleEmail = (e) => {
		const emailInput = e.target.value;
		this.setState({ email: emailInput });
	};

	handleRegister = (e) => {
		e.preventDefault();

		const user = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		};
		this.setState({ submitted: true });
		if (user.firstName && user.lastName && user.username && user.email && user.password) {
			this.props.dispatch(register(user));
		}
	};

	render() {
		const { errorMessage } = this.props;
		const {
			username, password, firstName, lastName, email, submitted
		} = this.state;

		return (

			<section className='hero is-fullheight'>
				<div className='hero-body'>
					<div className='container has-text-centered'>
						<div className='column is-4 is-offset-4'>
							<h3 className='title has-text-grey'>Register</h3>
							<div className='box'>
								<form>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handleFirstName}
												className='input is-large'
												type='text'
												value={firstName}
												placeholder='name'
												required
											/>
										</div>
										{submitted && !firstName &&
										<div className='notification is-danger'>
											<button className='delete'></button>
                        Name is required
										</div>
										}
									</div>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handleLastName}
												className='input is-large'
												type='text'
												value={lastName}
												placeholder='lastname'
												required
											/>
										</div>
										{submitted && !lastName &&
										<div className='notification is-danger'>
											<button className='delete'></button>
                      Surname is required
										</div>
										}
									</div>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handleEmail}
												className='input is-large'
												type='email'
												value={email}
												placeholder='email'
												required
											/>
										</div>
										{submitted && !email &&
										<div className='notification is-danger'>
											<button className='delete'></button>
                      Email is required
										</div>
										}
									</div>
									<div className='field'>
										<div className='control'>
											<input
												onChange={this.handleUsername}
												className='input is-large'
												type='text'
												value={username}
												placeholder='Username'
												required
											/>
										</div>
										{submitted && !username &&
										<div className='notification is-danger'>
											<button className='delete'></button>
                      Username is required
										</div>
										}
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
										{submitted && !password &&
										<div className='notification is-danger'>
											<button className='delete'></button>
                      Password is required
										</div>
										}
									</div>
									<button
										type='submit'
										onClick={this.handleRegister}
										className='button is-block is-info is-large is-fullwidth'
									>
										Register
									</button>
									{errorMessage &&
										<AuthError errorMsg={errorMessage} />
									}
								</form>
							</div>
							<p className='has-text-grey'>
								<Link to='/login'>Sign In</Link>&nbsp;·&nbsp;
							</p>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

Register.propTypes = {
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

export default connect(mapStateToProps)(Register);

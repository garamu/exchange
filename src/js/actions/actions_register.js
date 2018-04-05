// @flow

import request from 'superagent';

export const REGISTER_INIT_STATE = 'REGISTER_INIT_STATE';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const API_URL = 'http://localhost:3001';

export function registerInitState() {
	return {
		type: REGISTER_INIT_STATE,
		isRegistered: false
	};
}

export function registerRequest(user: Object) {
	return {
		type: REGISTER_REQUEST,
		isFetching: true,
		isRegistered: false,
		user
	};
}
export function registerSuccess(user: Object) {
	const profile = {
		username: user.username,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email
	};
	return {
		type: REGISTER_SUCCESS,
		isFetching: false,
		isRegistered: true,
		profile
	};
}
export function registerFailure(message: string) {
	return {
		type: REGISTER_FAILURE,
		isFetching: false,
		isRegistered: false,
		message
	};
}

export function registerUser(user: Object) {
	return (dispatch: Function) => {
		dispatch(registerRequest(user));
		request
			.post(`${API_URL}/api/user/register`)
			.type('form')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(user)
			.end((err, res) => {
				if (err || !res.ok) {
					console.log('Oh no! error');
					dispatch(registerFailure(err.message));
				} else {
					console.log(res);
					if (res.body.err) {
						dispatch(registerFailure(res.body.message));
					} else {
						// eslint-disable-next-line no-undef
						dispatch(registerSuccess(res.body));
					}
				}
			});
	};
}

// @flow

// import request from 'superagent';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// *****
// LOGIN
// *****

export function loginRequest(creds: Object) {
	return {
		type: LOGIN_REQUEST,
		isFetching: true,
		isAuthenticated: false,
		creds
	};
}

export function loginSuccess(user: Object) {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isAuthenticated: true,
		profile: user
	};
}

export function loginFailure(message: string) {
	return {
		type: LOGIN_FAILURE,
		isFetching: false,
		isAuthenticated: false,
		message
	};
}

export function login(creds: Object) {
	const params = {
		userid: creds.user,
		password: creds.password
	};
	return (dispatch: Function) => {
		dispatch(loginSuccess(params));
	};
}

// ******
// LOGOUT
// ******

export function logoutRequest() {
	return {
		type: LOGOUT_REQUEST,
		isFetching: true
	};
}

export function logoutSuccess() {
	return {
		type: LOGOUT_SUCCESS,
		isFetching: false,
		isAuthenticated: false
	};
}

export function logoutFailure(message: string) {
	return {
		type: LOGOUT_FAILURE,
		isFetching: false,
		isAuthenticated: true,
		message
	};
}

export function logout() {
	return (dispatch: Function) => {
		dispatch(logoutRequest());
		dispatch(logoutSuccess());
	};
}

// @flow

import request from 'superagent';
import { sessionService } from 'redux-react-session';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const API_URL = 'http://localhost:3001';
// *****
// LOGIN
// *****

export function login(creds: Object) {
	const params = {
		username: creds.username,
		password: creds.password
	};
	return () => {
		request
			.post(`${API_URL}/api/user/authenticate`)
			.type('form')
			.set('Content-Type', 'application/x-www-form-urlencoded')
			.send(params)
			.end((err, res) => {
				if (err || !res.ok) {
					console.log('Oh no! error');
				} else {
					const { token } = res.body._id;
					sessionService.saveSession({ token });
					sessionService.saveUser(res.body);
					console.log(sessionService);
				}
			});
	};
}

// ******
// LOGOUT
// ******


export function logout() {
	return () => {
		sessionService.deleteSession();
		sessionService.deleteUser();
	};
}

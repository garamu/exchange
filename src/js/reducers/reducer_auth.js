import {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_REQUEST,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE
} from '../actions/actions_auth';

// eslint-disable-next-line no-undef
const authIdToken = localStorage.getItem('authId');

const initialState = {
	isFetching: false,
	profile: null,
	error: '',
	// eslint-disable-next-line no-unneeded-ternary
	isAuthenticated: (authIdToken !== '' && authIdToken !== null) ? true : false
};

export default function auth(state = initialState, action) {
	switch (action.type) {
	case LOGIN_REQUEST:
		return {
			...state,
			isFetching: true,
			isAuthenticated: false,
			user: action.creds
		};
	case LOGIN_SUCCESS:
		return {
			...state,
			isFetching: false,
			isAuthenticated: true,
			profile: action.profile,
			errorMessage: ''
		};
	case LOGIN_FAILURE:
		return {
			...state,
			isFetching: false,
			isAuthenticated: false,
			errorMessage: action.message
		};
	case LOGOUT_REQUEST:
		return {
			...state,
			isFetching: true
		};
	case LOGOUT_SUCCESS:
		return {
			...state,
			isFetching: action.isFetching,
			isAuthenticated: action.isAuthenticated
		};
	case LOGOUT_FAILURE:
		return {
			...state,
			isFetching: false,
			isAuthenticated: true,
			errorMessage: action.message
		};
	default:
		return state;
	}
}

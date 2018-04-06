import {
	REGISTER_INIT_STATE,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_FAILURE
} from '../actions/actions_register';

const initialState = {
	isFetching: false,
	profile: null,
	error: '',
	// eslint-disable-next-line no-unneeded-ternary
	isRegistered: false
};

export default function auth(state = initialState, action) {
	switch (action.type) {
	case REGISTER_INIT_STATE:
		return {
			...state,
			isRegistered: false
		};
	case REGISTER_REQUEST:
		return {
			...state,
			isFetching: true,
			isRegistered: false,
			user: action.creds
		};
	case REGISTER_SUCCESS:
		return {
			...state,
			isFetching: false,
			isRegistered: true,
			profile: action.profile,
			errorMessage: ''
		};
	case REGISTER_FAILURE:
		return {
			...state,
			isFetching: false,
			isRegistered: false,
			errorMessage: action.message
		};
	default:
		return state;
	}
}

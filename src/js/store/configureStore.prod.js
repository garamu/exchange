import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
// import api from '../middleware/api';
import rootReducer from '../reducers';

// Middleware you want to use in production
const enhancer = applyMiddleware(thunkMiddleware);

// Reset the store if the user is successful logged out
const reducer = (state, action) => {
	if (action.type === 'LOGOUT_SUCCESS') {
		// eslint-disable-next-line no-param-reassign
		state = undefined;
	}
	return rootReducer(state, action);
};

export default function configureStore(initialState) {
	return createStore(reducer, initialState, enhancer);
}

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

// import api from '../middleware/api';
import rootReducer from '../reducers';

const logger = createLogger();

const enhancer = compose(
	// Middleware you want to use in development
	// applyMiddleware(thunkMiddleware, api, logger),
	applyMiddleware(thunkMiddleware, logger),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

// Reset the store if the user is successful logged out
const reducer = (state, action) => {
	if (action.type === 'LOGOUT_SUCCESS') {
		// eslint-disable-next-line no-param-reassign
		state = undefined;
	}
	return rootReducer(state, action);
};

export default function configureStore(initialState) {
	const store = createStore(reducer, initialState, enhancer);

	if (module.hot) {
		module.hot.accept('../reducers', () =>
			store.replaceReducer(require('../reducers').default));
	}

	return store;
}

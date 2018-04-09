import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';

// import auth from '../reducers/reducer_auth';
import register from '../reducers/reducer_register';

const rootReducer = combineReducers({
	session: sessionReducer,
	// auth,
	register
});

export default rootReducer;

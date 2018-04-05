import { combineReducers } from 'redux';
import auth from '../reducers/reducer_auth';
import register from '../reducers/reducer_register';

const rootReducer = combineReducers({
	auth,
	register
});

export default rootReducer;

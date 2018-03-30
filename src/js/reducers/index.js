import { combineReducers } from 'redux';
import auth from '../reducers/reducer_auth';

const rootReducer = combineReducers({
	auth
});

export default rootReducer;

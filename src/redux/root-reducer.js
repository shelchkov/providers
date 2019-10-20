import { combineReducers } from 'redux';
import buttonReducer from './button/button.reducer';

const rootReducer = combineReducers({
	button: buttonReducer
});

export default rootReducer;
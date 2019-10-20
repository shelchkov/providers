import { buttonActionTypes } from './button.types';

const INITIAL_STATE = {
	btnState: { text: "Submit", bgColor: "#58AF9B", color: "#F0F4F3" }
}

const buttonReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case buttonActionTypes.SET_BUTTON_TYPE:
			return {
				btnState: action.payload
			}
		default:
			return state;
	}
}

export default buttonReducer;
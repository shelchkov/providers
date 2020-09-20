import { buttonActionTypes } from "./button.types"
import { buttonStates } from "../../utils/button-states"

const INITIAL_STATE = {
  btnState: buttonStates.submit,
}

const buttonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case buttonActionTypes.SET_BUTTON_TYPE:
      return {
        btnState: {
          ...buttonStates[action.payload],
          type: action.payload,
        },
      }
    default:
      return state
  }
}

export default buttonReducer

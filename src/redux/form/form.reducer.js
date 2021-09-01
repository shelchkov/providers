import {
  BUTTON_CHECK,
  BUTTON_ERROR,
  BUTTON_SUBMIT,
  BUTTON_WAIT,
} from "../../utils/button-states"
import { formActionTypes } from "./form.types"

const INITIAL_STATE = {
  buttonType: BUTTON_SUBMIT,
  isValid: true,
  canSubmit: true,
  error: undefined,
}

export const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case formActionTypes.INIT:
      return INITIAL_STATE

    case formActionTypes.VALIDATION_FAIL:
      return { ...state, buttonType: BUTTON_CHECK, isValid: false }

    case formActionTypes.VALIDATION_SUCCESS:
      return { ...state, buttonType: BUTTON_SUBMIT, isValid: true }

    case formActionTypes.START_SUBMIT:
      if (!state.canSubmit) {
        return state
      }

      return { ...state, buttonType: BUTTON_WAIT, canSubmit: false }

    case formActionTypes.SUBMIT_SUCCESS:
      // eslint-disable-next-line no-console
      console.log("Response", action.payload.response)

      return { ...state, canSubmit: false }

    case formActionTypes.SUBMIT_FAIL:
      return {
        ...state,
        buttonType: BUTTON_ERROR,
        error: action.payload.error,
        canSubmit: true,
      }

    default:
      return state
  }
}

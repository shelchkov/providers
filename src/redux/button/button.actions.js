import { buttonActionTypes } from "./button.types"

export const setButtonType = (button) => ({
  type: buttonActionTypes.SET_BUTTON_TYPE,
  payload: button,
})

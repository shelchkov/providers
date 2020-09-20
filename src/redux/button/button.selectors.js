import { createSelector } from "reselect"

const selectButton = (state) => state.button

export const selectBtnState = createSelector(
  [selectButton],
  (button) => button.btnState
)

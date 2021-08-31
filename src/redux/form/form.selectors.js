import { createSelector } from "reselect"

const selectForm = (state) => state.form

export const selectButtonType = createSelector(
  [selectForm],
  (form) => form.buttonType
)
export const selectCanSubmit = createSelector(
  [selectForm],
  (form) => form.canSubmit
)
export const selectIsValid = createSelector(
  [selectForm],
  (form) => form.isValid
)
export const selectError = createSelector(
  [selectForm],
  (form) => form.error
)

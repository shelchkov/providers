import { formActionTypes } from "./form.types";

export const resetForm = () => ({ type: formActionTypes.INIT })
export const validationFail = () => ({ type: formActionTypes.VALIDATION_FAIL })
export const validationSuccess = () => ({ type: formActionTypes.VALIDATION_SUCCESS })
export const startSubmit = () => ({ type: formActionTypes.START_SUBMIT })
export const submitSuccess = (response) => ({ type: formActionTypes.SUBMIT_SUCCESS, payload: { response } })
export const submitFail = (error) => ({ type: formActionTypes.SUBMIT_FAIL, payload: { error } })

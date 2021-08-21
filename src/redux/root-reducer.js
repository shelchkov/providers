import { combineReducers } from "redux"
import { formReducer } from "./form/form.reducer"

const rootReducer = combineReducers({
  form: formReducer
})

export default rootReducer

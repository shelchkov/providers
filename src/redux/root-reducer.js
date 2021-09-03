import { combineReducers } from "redux"
import { formReducer } from "./form/form.reducer"
import { providersReducer } from "./providers/providers.reducer"

const rootReducer = combineReducers({
  form: formReducer,
  providers: providersReducer,
})

export default rootReducer

import { createStore, applyMiddleware } from "redux"
import rootReducer from "./root-reducer"
import logger from "redux-logger"

const middlewares = []

// eslint-disable-next-line
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger)
}

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

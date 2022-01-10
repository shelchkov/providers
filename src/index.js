import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import "tachyons"
import { Provider } from "react-redux"
import { store } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import { ScreenCoverProvider } from "screen-cover"
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary"

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <BrowserRouter>
        <ScreenCoverProvider>
          <App />
        </ScreenCoverProvider>
      </BrowserRouter>
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
)

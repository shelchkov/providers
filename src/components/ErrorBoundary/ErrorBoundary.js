import React from "react"
import { ErrorPage } from "./ErrorPage"

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = { error: undefined }
  }

  static getDerivedStateFromError(error) {
    return { error: error.message }
  }

  render() {
    if (this.state.error) {
      return <ErrorPage />
    }

    return this.props.children
  }
}

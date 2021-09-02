import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Switch, Route, withRouter } from "react-router-dom"
import { compose } from "redux"
import { withScreenCover } from "screen-cover"

import { ProvidersList } from "./components/ProvidersList/ProvidersList"
import Form from "./components/Form/Form"

import { requestInfo } from "./utils/api-utils"
import {
  startSubmit,
  submitSuccess,
  submitFail,
} from "./redux/form/form.actions"
import { selectProvider } from "./redux/providers/providers.selectors"

const AppDiv = styled.div`
  text-align: center;
`

class App extends React.PureComponent {
  submitForm = async (formData) => {
    this.props.startSubmit()

    try {
      const response = await requestInfo(
        formData,
        this.props.provider
      )

      this.props.submitSuccess(response)
      this.goHome()
    } catch (error) {
      this.props.submitFail(error.message)
    }
  }

  goHome = () => this.props.showCover(() => this.props.history.push("/"))

  render() {
    return (
      <AppDiv>
        <Switch>
          <Route
            exact
            path="/"
            component={ProvidersList}
          />

          <Route
            exact
            path="/form"
            render={() => (
              <Form
                getHome={this.goHome}
                submitForm={this.submitForm}
              />
            )}
          />
        </Switch>
      </AppDiv>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  provider: selectProvider,
})

const mapDispatchToProps = (dispatch) => ({
  startSubmit: () => dispatch(startSubmit()),
  submitSuccess: (response) => dispatch(submitSuccess(response)),
  submitFail: (error) => dispatch(submitFail(error)),
})

export default compose(
  withScreenCover,
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)

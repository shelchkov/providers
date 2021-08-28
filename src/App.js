import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { Switch, Route, withRouter } from "react-router-dom"
import { compose } from "redux"
import { withScreenCover } from "screen-cover"

import { ProvidersList } from "./components/ProvidersList/ProvidersList"
import Form from "./components/Form/Form"

import { providersList } from "./utils/providers-list"
import { requestInfo } from "./utils/api-utils"
import { startSubmit, submitSuccess, submitFail } from "./redux/form/form.actions"
import { selectCanSubmit } from "./redux/form/form.selectors"
import { getProvider } from "./utils/utils"

const AppDiv = styled.div`
  text-align: center;
`

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = { selectedProvider: {} }
  }

  setProvider = (providerId) => {
    const selectedProvider = getProvider(providersList, providerId)

    if (!selectedProvider) {
      this.props.history.push("/")
    }

    this.setState({ selectedProvider })
  }

  submitForm = async (formData) => {
    if (!this.props.canSubmit) {
      return
    }
    
    this.props.startSubmit()

    try {
      const response = await requestInfo(formData, this.state.selectedProvider)
      
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
            render={() => <ProvidersList setProvider={this.setProvider} />}
          />
          
          <Route
            exact
            path="/form"
            render={() => (
              <Form
                getHome={this.goHome}
                submitForm={this.submitForm}
                provider={this.state.selectedProvider}
                setProvider={this.setProvider}
              />
            )}
          />
        </Switch>
      </AppDiv>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  canSubmit: selectCanSubmit,
})

const mapDispatchToProps = (dispatch) => ({
  startSubmit: () => dispatch(startSubmit()),
  submitSuccess: (response) => dispatch(submitSuccess(response)),
  submitFail: (error) => dispatch(submitFail(error)),
})

export default compose(withScreenCover, withRouter, connect(mapStateToProps, mapDispatchToProps))(App)

import React from "react"
import "./App.css"
import { ProvidersList } from "./components/ProvidersList/ProvidersList"
import Form from "./components/Form/Form"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import ScreenHover from "./components/ScreenHover/ScreenHover"
import { Switch, Route, withRouter } from "react-router-dom"

import { providersList } from "./utils/providers-list"
import { sendRequest, urlParams } from "./utils/utils"
import { startSubmit, submitSuccess, resetForm, submitFail } from "./redux/form/form.actions"
import { selectCanSubmit } from "./redux/form/form.selectors"

const AppDiv = styled.div`
  text-align: center;
`

class App extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      selectedProvider: {},
      coverUp: false,
      coverShow: false,
    }
  }

  setProvider = (providerId) => {
    let selectedProvider

    if (Number.isFinite(providerId)) {
      selectedProvider = providersList.find(({ id }) => id === providerId)
    }

    if (!selectedProvider) {
      this.props.history.push("/")
    }

    this.setState({ selectedProvider })
  }

  selectProvider = (providerId) => {
    this.setProvider(providerId)
    this.props.resetForm()
    this.cover("form")
  }

  submitForm = (formData) => {
    if (!this.props.canSubmit) {
      return
    }
    
    this.props.startSubmit()

    this.requestInfo(formData)
      .then((res) => {
        console.log(res)
        this.props.submitSuccess()
        this.getHome()
      })
      .catch((error) => {
        console.log("Error: " + error.message)
        this.props.submitFail(error.message)
      })
  }

  cover = (route) => {
    this.setState({ coverShow: true })

    setTimeout(() => {
      this.setState({ coverUp: true })
    }, 0)

    // Move cover up and open the screen
    setTimeout(() => {
      this.setState({ coverShow: false })
      this.props.history.push(
        route === "home"
          ? ""
          : `${route}?${urlParams.provider}=${this.state.selectedProvider.id}`
      )
    }, 1100)

    // Stop showing cover
    setTimeout(() => {
      this.setState({ coverUp: false })
    }, 2000)
  }

  async requestInfo(formData) {
    if (formData.phone.length !== 11 || !formData.amount) {
      throw new Error("Wrong Data provided!")
    }

    const result = await sendRequest(
      this.state.selectedProvider,
      formData
    )

    return result
  }

  getHome = () => {
    this.cover("home")
  }

  render() {
    return (
      <AppDiv>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <ProvidersList selectProvider={this.selectProvider} />
            )}
          />
          
          <Route
            exact
            path="/form"
            render={() => (
              <Form
                getHome={this.getHome}
                submitForm={this.submitForm}
                provider={this.state.selectedProvider}
                setProvider={this.setProvider}
              />
            )}
          />
        </Switch>

        {(this.state.coverShow || this.state.coverUp) && (
          <ScreenHover
            coverUp={this.state.coverUp}
            coverShow={this.state.coverShow}
          />
        )}
      </AppDiv>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  canSubmit: selectCanSubmit,
})

const mapDispatchToProps = (dispatch) => ({
  resetForm: () => dispatch(resetForm()),
  startSubmit: () => dispatch(startSubmit()),
  submitSuccess: () => dispatch(submitSuccess()),
  submitFail: (error) => dispatch(submitFail(error)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

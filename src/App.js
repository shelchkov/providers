import React from "react"
import "./App.css"
import { ProvidersList } from "./components/ProvidersList/ProvidersList"
import Form from "./components/Form/Form"
import styled from "styled-components"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import { selectBtnState } from "./redux/button/button.selectors"
import { setButtonType } from "./redux/button/button.actions"
import ScreenHover from "./components/ScreenHover/ScreenHover"
import { Switch, Route, withRouter } from "react-router-dom"

import { providersList } from "./utils/providers-list"
import { sendRequest, urlParams } from "./utils/utils"

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
      errorMessage: "",
    }
  }

  setProvider = (providerId) => {
    const selectedProvider = providersList.find(
      (provider) => provider.id === providerId
    )

    const changes = { errorMessage: "" }

    if (selectedProvider) {
      changes.selectedProvider = selectedProvider
    } else {
      this.props.history.push("/")
    }

    this.setState(changes)
  }

  selectProvider = (providerId) => {
    this.setProvider(providerId)
    this.props.setButtonState("submit")
    this.cover("form")
  }

  submitForm = (formData) => {
    if (["wait", "success"].includes(this.props.buttonState.type)) {
      return
    }

    this.props.setButtonState("wait")

    this.requestInfo(formData)
      .then((res) => {
        console.log(res)
        this.props.setButtonState("success")
        this.getHome()
      })
      .catch((error) => {
        console.log("Error: " + error.message)
        this.setState({
          errorMessage: error.message,
        })
        this.props.setButtonState("error")
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
                errorMessage={this.state.errorMessage}
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
  buttonState: selectBtnState,
})

const mapDispatchToProps = (dispatch) => ({
  setButtonState: (button) => dispatch(setButtonType(button)),
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(App)
)

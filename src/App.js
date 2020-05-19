import React from 'react';
import './App.css';
import { ProvidersList } from './components/ProvidersList/ProvidersList';
import Form from './components/Form/Form';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectBtnState } from './redux/button/button.selectors';
import { setButtonType } from './redux/button/button.actions';
import ScreenHover from "./components/ScreenHover/ScreenHover";
import { Switch, Route, withRouter } from "react-router-dom";

import providers from "./providersList";

const AppDiv = styled.div`
  text-align: center;
`;

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      selectedProvider: {},
      coverUp: false,
      coverShow: false,
      errorMessage: ""
    };
  }


  setProvider = (providerId) => {
    const selectedProvider = providers.find(provider => provider.id === providerId);
    this.setState({ selectedProvider, errorMessage: "" });
  }

  selectProvider = (providerId) => {
    this.setProvider(providerId);
    this.props.setButtonState("submit");
    this.cover("form");
  }

  submitForm = (formData) => {
    if(this.props.buttonState.text === "Please Wait" || 
      this.props.buttonState.text === "Success") {
      return;
    }
    this.props.setButtonState("wait");
    this.requestInfo(formData)
      .then(res => {
        console.log(res);
        this.getHome();
        this.props.setButtonState("success");
      })
      .catch(error => {
        console.log("Error: " + error.message);
        this.setState({
          errorMessage: error.message,
        });
        this.props.setButtonState("error");
      });
  }

  cover = (route) => {
    this.setState({ coverShow: true });

    setTimeout(() => {
      this.setState({ coverUp: true });
    }, 0);

    // Move cover up and open the screen
    setTimeout(() => {
      this.setState({ coverShow: false });
      this.props.history.push(route === "home" ? "" : `${route}?provider=${this.state.selectedProvider.id}`);
    }, 1100);

    // Stop showing cover
    setTimeout(() => {
      this.setState({ coverUp: false });
    }, 2000);
  }

  async requestInfo (formData) {
    if(formData.phone.length !== 11 || !formData.amount) {
      throw new Error("Wrong Data provided!");
    }
    // Request Time: 900 - 2000ms
    const reqTime = Math.random() * 1100 + 900;
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if(Math.random() < .5) {
          resolve(
            {result: "success", data: {
              some: "Information", 
              other: "Information",
              provider: {name: this.state.selectedProvider.name}
            }, user: {
              phone: formData.phone,
              amount: formData.amount,
            }}
          );
        } else {
          reject({message: "Something went wrong"});
        }
      }, reqTime);
    });
    return result;
  }

  getHome = () => {
    this.cover("home");
  }


  render() {
    return (
      <AppDiv>
        <Switch>
          <Route exact path="/" render={() => 
            <ProvidersList selectProvider={this.selectProvider} />
          } />
          <Route exact path="/form" render={() => 
            <Form getHome={this.getHome} submitForm={this.submitForm} 
              provider={this.state.selectedProvider} 
              errorMessage={this.state.errorMessage} 
              setProvider={this.setProvider} /> 
          } />
        </Switch>
        {(this.state.coverShow || this.state.coverUp) && <ScreenHover 
          coverUp={this.state.coverUp} coverShow={this.state.coverShow} />}
      </AppDiv>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  buttonState: selectBtnState
});

const mapDispatchToProps = dispatch => ({
  setButtonState: (button) => dispatch(setButtonType(button))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

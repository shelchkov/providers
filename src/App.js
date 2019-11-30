import React from 'react';
import './App.css';
import ProvidersList from './components/ProvidersList/ProvidersList';
import Cover from './components/Cover/Cover';
import CoverHide from './components/CoverHide/CoverHide';
import Form from './components/Form/Form';
import styled from 'styled-components';
import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
import { setButtonType } from './redux/button/button.actions';
import btnStates from './buttonStates';

const AppDiv = styled.div`
  text-align: center;
`;

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      route: "home", // "home", "form"
      selectedProvider: {},
      showCover: false,
      hideCover: false,
      errorMessage: ""
    };
  }



  selectProvider = (provider) => {
    this.setState({
      selectedProvider: provider,
      errorMessage: "",
      btnState: { text: "Submit", bgColor: "#58AF9B", color: "#F0F4F3" }
    });
    this.props.setButtonState({ text: "Submit", bgColor: "#58AF9B", color: "#F0F4F3" });
    this.cover("form");
  }

  submitForm = (formData) => {
    this.requestInfo(formData)
      .then(res => {
        console.log(res);
        this.getHome("home");
      })
      .catch(error => {
        console.log("Error: " + error.message);
        this.setState({
          errorMessage: error.message,
          btnState: btnStates.error
        });
        this.props.setButtonState(btnStates.error);
      });
  }

  cover = (route) => {
    this.setState({
      showCover: true
    });
    setTimeout(() => {
      this.setState({
        showCover: false,
        hideCover: true,
        route: route
      });
    }, 1000);
    setTimeout(() => {
      this.setState({
        hideCover: false
      });
    }, 2000);
  }

  async requestInfo (formData) {
    // Request Time: 900 - 2000ms
    let reqTime = Math.random() * 1100 + 900;
    let result = await new Promise((resolve, reject) => {
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
        { this.state.route === "home" ? 
        <ProvidersList selectProvider={this.selectProvider} />
        :
        <Form getHome={this.getHome} submitForm={this.submitForm} 
          provider={this.state.selectedProvider} errorMessage={this.state.errorMessage} 
          /> 
        }
        { this.state.showCover ? 
        <Cover /> 
        : null }
        { this.state.hideCover ? 
        <CoverHide/> 
        : null }
      </AppDiv>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setButtonState: (button) => dispatch(setButtonType(button))
});

export default connect(null, mapDispatchToProps)(App);
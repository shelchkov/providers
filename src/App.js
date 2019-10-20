import React from 'react';
import './App.css';
import ProvidersList from './components/ProvidersList/ProvidersList';
import Cover from './components/Cover/Cover';
import CoverHide from './components/CoverHide/CoverHide';
import Form from './components/Form/Form';

const btnStates = {
  error: { text: "Error", bgColor: "#C52423", color: "#F0F4F3" },
  success: { text: "Success", bgColor: "#148653", color: "#F0F4F3" },
  submit: { text: "Submit", bgColor: "#58AF9B", color: "#F0F4F3" },
  check: { text: "Check Info!", bgColor: "#F2990F", color: "#F0F4F3" },
  wait: { text: "Please Wait", bgColor: "#58AF9B", color: "#F0F4F3" }
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: "home", // "home", "form"
      providers: [
        {name: "Megafon", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/MegaFon_sign%2Blogo_horiz_green_RU_%28RGB%29.svg/512px-MegaFon_sign%2Blogo_horiz_green_RU_%28RGB%29.svg.png"},
        {name: "MTS", logo: "https://upload.wikimedia.org/wikipedia/commons/8/86/MTS_logo_2015.svg"},
        {name: "Beeline", logo: "https://www.ripe.net/participate/meetings/regional-meetings/images/beeline_logo.png/image"},
      ],
      selectedProvider: {},
      btnState: { text: "Submit", bgColor: "#58AF9B", color: "#F0F4F3" },
      showCover: false,
      hideCover: false,

      phone: "",
      amount: "",
      phoneError: "",
      amountError: "",
      errorMessage: ""
    };
  }


  selectProvider = (provider) => {
    this.setState({
      selectedProvider: provider,
      phoneError: "",
      amountError: "",
      phone: "",
      amount: "",
      btnState: btnStates.submit,
      errorMessage: ""
    });
    this.cover("form");
  }

  checkForm = () => {
    if(this.state.btnState.text === "Please Wait") {
      return;
    }
    this.setState({errorMessage: ""});

    // Phone Validation
    if(this.state.phone.length === 0) {
      this.setState({
        phoneError: "You need to type in your phone number",
        btnState: btnStates.check
      });
    } else if(this.state.phone[1] !== "9") {
      this.setState({
        phoneError: "Please provide correct number",
        btnState: btnStates.check
      });
    } else if(this.state.phone.length !== 11) {
      this.setState({
        phoneError: "Phone number should contain exactly 11 digits"
      });
    } else {
      this.setState({
        phoneError: "",
        btnState: btnStates.submit
      });
    }

    // Amount Validation
    if(this.state.amount < 1) {
      this.setState({
        amountError: "You can choose amount that lies between 1 and 1000 rubles",
        btnState: btnStates.check
      });
    } else {
      this.setState({
        amountError: ""
      });
    }
  }

  clearErrors = () => {
    this.setState({
      amountError: "",
      phoneError: ""
    });
  }

  submitForm = () => {
    this.setState({
      errorMessage: "",
      btnState: btnStates.wait
    });
    this.requestInfo()
      .then(res => {
        console.log(res);
        this.setState({
          btnState: btnStates.success
        });
        this.getHome("home");
      })
      .catch(error => {
        console.log("Error: " + error.message);
        this.setState({
          btnState: btnStates.error,
          errorMessage: error.message
        });
      });
  }

  setPhone = (data) => {
    // Remove everything except numbers
    let phone = data.replace(/\D/g, "");
    this.setState({phone});
  }

  setAmount = (data) => {
    let amount = data.replace(/\D/g, "");
    this.setState({amount});
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

  async requestInfo () {
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
              phone: this.state.phone,
              amount: this.state.amount,
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
      <div className="App">
        { this.state.route === "home" ? 
        <ProvidersList providers={this.state.providers} selectProvider={this.selectProvider} />
        :
        <Form getHome={this.getHome} setPhone={this.setPhone} 
          setAmount={this.setAmount} btnState={this.state.btnState} 
          checkForm={this.checkForm} submitForm={this.submitForm} 
          phoneError={this.state.phoneError} amountError={this.state.amountError} 
          phone={this.state.phone} errorMessage={this.state.errorMessage} 
          provider={this.state.selectedProvider} clearErrors={this.clearErrors} /> 
        }
        { this.state.showCover ? 
        <Cover /> 
        : null }
        { this.state.hideCover ? 
        <CoverHide/> 
        : null }
      </div>
    );
  }
}

export default App;

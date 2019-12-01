import React, { useState, useEffect } from 'react';
import './Form.css';
import Input from '../Input/Input';
import FormContainer from '../FormContainer/FormContainer';
import btnStates from '../../buttonStates';
import { connect } from 'react-redux';
import { selectBtnState } from '../../redux/button/button.selectors';
import { createStructuredSelector } from 'reselect';
import { setButtonType } from '../../redux/button/button.actions';
import FocusBg from './FocusBg';
import ErrorP from './ErrorP';
import ErrorText from './ErrorText';

const Form = React.memo(({getHome, submitForm, provider, errorMessage, 
	buttonState, setButtonState}) => {

	const [formData, setFormData] = useState({phone: "", amount: ""});

	const [formErrors, setFormErrors] = useState({
		phone: "", amount: ""
	});

	const [screenHeight, setScreenHeight] = useState(window.innerHeight);

	useEffect(() => {
		const resizeHandler = (event) => {
			setScreenHeight(event.target.innerHeight);
		}

		window.onresize = resizeHandler;
		return () => {
			window.removeEventListener("onresize", resizeHandler);
		};
	}, []);

	function setForm(field, data) {
		let amount = data.replace(/\D/g, "");
		setFormData({
			...formData,
			[field]: amount,
		});
		console.log(formData);
	}

	function clearErrors() {
		console.log("Clear");
		setFormErrors({phone: "", amount: ""});
	}

	const handleEnterPress = (event) => {
		if(event.keyCode === 13 && !checkForm()) {
			submitForm(formData);
		}
	}

	function checkForm () {
		if(buttonState.text === "Please Wait") {
			return;
		}

		let phoneError = "";
		let amountError = "";
		let btnState = btnStates.check;

		// Phone Validation
		if(formData.phone.length === 0) {
			phoneError = "You need to type in your phone number";

		} else if(formData.phone[1] !== "9") {
			phoneError = "Please provide correct number";
		
		} else if(formData.phone.length !== 11) {
			phoneError = "Phone number should contain exactly 11 digits";
		
		} else {
			phoneError = "";
			btnState = btnStates.submit;
		}

		// Amount Validation
		if(formData.amount < 1) {
			amountError = "You can choose amount that lies between 1 and 1000 rubles";
			btnState = btnStates.check;

		} else {
			amountError = "";
		}

		setFormErrors({
			phone: phoneError,
			amount: amountError
		});
		setButtonState(btnState);

		return phoneError || amountError ? {
			phone: phoneError,
			amount: amountError
		} : null;
	}


	return (
		<>
			{screenHeight > 321 ?
			<div className="mt2 mb3 ml3 mr3">
				<img src={provider.logo} alt={provider.name} 
					title={provider.name} className="logo" />
			</div> : null }

			<div className="mb1">
				<div className="flex items-start">
					<button onClick={getHome} 
						className="br3 ba ph3 pv2 mb2 pointer btn active get-back-btn bg-transparent">
						Get Back
					</button>
				</div>
			</div>
		
			<form className="flex flex-column mb3">
				<div className="mt3">
					<div className="relative">
						<Input setInput={(data) => setForm("phone", data)} 
							error={formErrors.phone} 
							mask="+7 (999) 999-99-99" 
							clearErrors={clearErrors} 
							onKeyDown={handleEnterPress} />
						<label>Phone Number</label>
						<FocusBg />
					</div>
					{ formErrors.phone.length > 0 ?
					<ErrorText message={formErrors.phone} />
					: null }
				</div>
				<div className="mt4 mb1">
					<div className="relative">
						<Input setInput={(data) => setForm("amount", data)} 
						error={formErrors.amount} mask="Rub 999" 
							clearErrors={clearErrors} 
							onKeyDown={handleEnterPress} />
						<label>Amount</label>
						<FocusBg />
					</div>
					{ formErrors.amount.length > 0 ?
					<ErrorText message={formErrors.amount} />
					: null }
				</div>
			</form>
			{ buttonState.text === "Check Info!" ?
			<button onMouseOver={checkForm} 
				title="Please Provide Correct Information"
				className="btn br3 ba ph3 pv2 mb2 not-allowed center">
				{buttonState.text}
			</button>
			:
			<button onClick={() => submitForm(formData)} 
				onMouseOver={checkForm} 
				className="btn br3 ba ph3 pv2 mb2 active pointer center" 
				style={{background: buttonState.bgColor, color: buttonState.color}} >
				{buttonState.text}
			</button>
			}
			{ errorMessage.length > 0 ?
			<ErrorP errorMessage={errorMessage} />
			: null
			}
		</>
	);
});

// Receive state elements for that element
const mapStateToProps = createStructuredSelector({
  buttonState: selectBtnState
});

// Set State
const mapDispatchToProps = dispatch => ({
  setButtonState: (button) => dispatch(setButtonType(button))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer(Form));
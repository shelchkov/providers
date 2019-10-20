import React, { useState } from 'react';
import './Form.css';
import Input from '../Input/Input';
import styled from 'styled-components';
import FormContainer from '../FormContainer/FormContainer';
import btnStates from '../../buttonStates';
import { connect } from 'react-redux';
import { selectBtnState } from '../../redux/button/button.selectors';
import { createStructuredSelector } from 'reselect';
import { setButtonType } from '../../redux/button/button.actions';

const FocusBg = styled.span`
&:before, &:after {
	content: ""; 
	position: absolute; 
	left: 0; 
	top: 0; 
	width: 0; 
	height: 0; 
	background-color: #EDEDED; 
	transition: 0.3s; 
	z-index: -1;
}
`;

const ErrorText = styled.small`
	color: #AAA;
	margin-bottom: -1rem;
`;

const ErrorP = styled.p`
	color: #777;
`;

function Form({getHome, submitForm, provider, errorMessage, 
	buttonState, setButtonState}) {

	const btnState = buttonState;

	const [formData, setFormData] = useState({phone: "", amount: ""});

	const [formErrors, setFormErrors] = useState({
		phone: "", amount: ""
	});

	function setForm(field, data) {
		let amount = data.replace(/\D/g, "");
		setFormData({
			...formData,
			[field]: amount,
		});
		console.log(formData);
	}

	function checkForm () {
		console.log(formErrors);
		console.log(buttonState);
		if(buttonState.text === "Please Wait") {
			return;
		}

		let phoneError = "";
		let amountError = "";

		// Phone Validation
		if(formData.phone.length === 0) {
			setButtonState(btnStates.check);
			phoneError = "You need to type in your phone number";

		} else if(formData.phone[1] !== "9") {
			phoneError = "Please provide correct number";
			setButtonState(btnStates.check);
		
		} else if(formData.phone.length !== 11) {
			phoneError = "Phone number should contain exactly 11 digits";
		
		} else {
			phoneError = "";
			setButtonState(btnStates.submit);
		}

		// Amount Validation
		if(formData.amount < 1) {
			amountError = "You can choose amount that lies between 1 and 1000 rubles";
			setButtonState(btnStates.check);

		} else {
			amountError = "";
		}

		setFormErrors({
			phone: phoneError,
			amount: amountError
		});
	}

	function clearErrors() {
		console.log("Clear");
		setFormErrors({phone: "", amount: ""});
	}


	return (
		<>
			{window.innerHeight > 321 ?
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
							clearErrors={clearErrors} />
						<label>Phone Number</label>
						<FocusBg className="focus-bg"></FocusBg>
					</div>
					{ formErrors.phone.length > 0 ?
					<ErrorText className="f6 black-60 db mt1">
						{formErrors.phone}
					</ErrorText>
					: null }
				</div>
				<div className="mt4 mb1">
					<div className="relative">
						<Input setInput={(data) => setForm("amount", data)} 
						error={formErrors.amount} 
							mask="Rub 999" clearErrors={clearErrors} />
						<label>Amount</label>
						<FocusBg className="focus-bg"></FocusBg>
					</div>
					{ formErrors.amount.length > 0 ?
					<ErrorText className="f6 black-60 db mt1 mb1">
						{formErrors.amount}
					</ErrorText>
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
			<ErrorP className="mt0 f6" title="There was an error. Try Again">
				{errorMessage}
			</ErrorP>

			: null
			}
		</>
	);
}

// Receive state elements for that element
const mapStateToProps = createStructuredSelector({
  buttonState: selectBtnState
});

// Set State
const mapDispatchToProps = dispatch => ({
  setButtonState: (button) => dispatch(setButtonType(button))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer(Form));
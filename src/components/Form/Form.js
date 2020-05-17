import React, { useState, useEffect } from 'react';
import './Form.css';
import { InputBase as Input } from '../Input/InputBase';
import FormContainer from '../FormContainer/FormContainer';
import btnStates from '../../buttonStates';
import { connect } from 'react-redux';
import { selectBtnState } from '../../redux/button/button.selectors';
import { createStructuredSelector } from 'reselect';
import { setButtonType } from '../../redux/button/button.actions';
import { FocusBg } from './FocusBg';
import ErrorP from './ErrorP';
import ErrorText from './ErrorText';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";

const Button = styled.button`
	outline: none;
	opacity: .9;
`;

const ActiveBtn = styled(Button)`
	&:hover, &:focus {
		transform: scale(.96);
		opacity: 1;
		transition: transform .12s ease-out, opacity .12s ease-out;
		box-shadow: 0px 0px 38px -5px rgba(204,204,204,0.46);
	}
`;

const NotAllowedBtn = styled(Button)`
	cursor: not-allowed;
	color: #777;
`;

const GetBackBtn = styled(ActiveBtn)`
	color: #333;
	border-color: #CCC;
`;

const extractSearchValue = (search, name) => {
	const value = search.replace("?", "")
		.split("&").map(value => value.split("="))
		.find(value => value[0] === name)

	return value && value[1]
}


const Form = React.memo(({ getHome, submitForm, provider, errorMessage, 
	buttonState, setButtonState, history, setProvider }) => {

	if (!provider.id) {
		const search = history.location.search;
		const selectedProviderId = search && 
			extractSearchValue(search, "provider");
		if (selectedProviderId) {
			setProvider(parseInt(selectedProviderId));
		}
	}

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

	function clearErrors() {
		console.log("Clear");
		setFormErrors({phone: "", amount: ""});
	}

	const handleEnterPress = (event) => {
		if(event.keyCode === 13 && !checkForm()) {
			submitForm(formData);
		}
	}

	const handleFormSubmit = () => {
		submitForm(formData);
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
					<GetBackBtn onClick={getHome} 
						className="br3 ba ph3 pv2 mb2 pointer bg-transparent">
						Get Back
					</GetBackBtn>
				</div>
			</div>
		
			<form className="flex flex-column mb3">
				<div style={{ marginTop: "1.1rem" }}>
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
				<div className="mb1" style={{ marginTop: "1.65rem" }}>
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
			<NotAllowedBtn onMouseOver={checkForm} onFocus={checkForm}
				title="Please Provide Correct Information"
				className="br3 ba ph3 pv2 mb2 center" 
				onKeyDown={handleEnterPress}>
				{buttonState.text}
			</NotAllowedBtn>
			:
			<ActiveBtn onClick={handleFormSubmit} 
				onMouseOver={checkForm} onFocus={checkForm}
				className="br3 ba ph3 pv2 mb2 pointer center" 
				style={{background: buttonState.bgColor, color: buttonState.color}} >
				{buttonState.text}
			</ActiveBtn>
			}
			{ errorMessage.length > 0 && buttonState.text === "Error" ?
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormContainer(Form)));
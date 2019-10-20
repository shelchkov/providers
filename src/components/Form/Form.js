import React from 'react';
import './Form.css';
import Input from '../Input/Input';
import styled from 'styled-components';
import FormContainer from '../FormContainer/FormContainer';

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

function Form({getHome, setPhone, setAmount, btnState, checkForm, phoneError, 
	submitForm, amountError, errorMessage, provider, clearErrors}) {

	return (
		<>
			{window.innerHeight > 321 ?
			<div className="mt2 mb3 ml3 mr3">
				<img src={provider.logo} alt={provider.name} 
					title={provider.name} className="logo" />
			</div> : null }

			<div className="mb1">
				<div className="flex items-start">
					<button onClick={getHome} className="br3 ba ph3 pv2 mb2 pointer btn active get-back-btn bg-transparent">
						Get Back
					</button>
				</div>
			</div>
		
			<form className="flex flex-column mb3">
				<div className="mt3">
					<div className="relative">
						<Input setInput={setPhone} error={phoneError} 
							mask="+7 (999) 999-99-99" clearErrors={clearErrors} />
						<label>Phone Number</label>
						<FocusBg className="focus-bg"></FocusBg>
					</div>
					{ phoneError.length > 0 ?
					<ErrorText className="f6 black-60 db mt1">
						{phoneError}
					</ErrorText>
					: null }
				</div>
				<div className="mt4 mb1">
					<div className="relative">
						<Input setInput={setAmount} error={amountError} 
							mask="Rub 999" clearErrors={clearErrors} />
						<label>Amount</label>
						<FocusBg className="focus-bg"></FocusBg>
					</div>
					{ amountError.length > 0 ?
					<ErrorText className="f6 black-60 db mt1 mb1">
						{amountError}
					</ErrorText>
					: null }
				</div>
			</form>
			{ btnState.text === "Check Info!" ?
			<button onMouseOver={checkForm} title="Please Provide Correct Information"
				className="btn br3 ba ph3 pv2 mb2 not-allowed center">
				{btnState.text}
			</button>
			:
			<button onClick={submitForm} onMouseOver={checkForm} 
				className="btn br3 ba ph3 pv2 mb2 active pointer center" 
				style={{background: btnState.bgColor, color: btnState.color}} >
				{btnState.text}
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

export default FormContainer(Form);
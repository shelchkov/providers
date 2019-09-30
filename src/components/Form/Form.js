import React from 'react';
import './Form.css';
import Input from '../Input/Input';
import styled from 'styled-components';

function Form({getHome, setPhone, setAmount, btnState, checkForm, phoneError, 
	submitForm, amountError, errorMessage, provider}) {

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

	return (
		<div className="vh-100 flex flex-column justify-center">
			<div className="mt2 w-50 w-40-ns center mb1 mw-240">
				<img src={provider.logo} alt={provider.name} 
					title={provider.name} className="logo" />
			</div>

			<div className="mt3 w-50 w-40-ns center mb1 mw-240">
				<div className="flex items-start">
					<button onClick={getHome} className="br3 ba ph3 pv2 mb2 pointer btn active get-back-btn bg-transparent">
						Get Back
					</button>
				</div>
			</div>
		
			<form className="flex flex-column items-center mb3">
				<div className="mt3 w-50 w-40-ns mw-240">
					<div className="relative">
						<Input setInput={setPhone} error={phoneError} 
							mask="+7 (999) 999-99-99" />
						<label>Phone Number</label>
						<FocusBg className="focus-bg"></FocusBg>
					</div>
					{ phoneError.length > 0 ?
					<ErrorText className="f6 black-60 db mt1">
						{phoneError}
					</ErrorText>
					: null }
				</div>
				<div className="w-50 w-40-ns mw-240 mt4 mb1">
					<div className="relative">
						<Input setInput={setAmount} error={amountError} 
							mask="Rub 999"/>
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
		</div>
	);
}

export default Form;
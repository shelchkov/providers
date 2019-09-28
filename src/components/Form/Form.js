import React from 'react';
import './Form.css';
import Input from '../Input/Input';

function Form({getHome, setPhone, setAmount, btnState, checkForm, phoneError, 
	submitForm, amountError, errorMessage, provider}) {	

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
						<span className="focus-bg"></span>
					</div>
					{ phoneError.length > 0 ?
					<small className="f6 black-60 db mt1">
						{phoneError}
					</small>
					: null }
				</div>
				<div className="w-50 w-40-ns mw-240 mt4 mb1">
					<div className="relative">
						<Input setInput={setAmount} error={amountError} 
							mask="Rub 999"/>
						<label>Amount</label>
						<span className="focus-bg"></span>
					</div>
					{ amountError.length > 0 ?
					<small className="f6 black-60 db mt1 mb1">
						{amountError}
					</small>
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
			<p className="mt0 f6 error-message" title="There was an error. Try Again">
				{errorMessage}
			</p>
			: null
			}
		</div>
	);
}

export default Form;
import React from 'react';
import './Input.css';
import InputMask from 'react-input-mask';

function Input({setInput, error, mask, clearErrors, ...other}) {

	const [hasContent, setHasContent] = React.useState(false);

	function inputChange(event) {
		if(event.target.value.length > 0) {
			setHasContent(true);
		} else {
			setHasContent(false);
		}
		setInput(event.target.value);
	}

	if(hasContent) {
		if(error.length > 0) {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent has-content error" 
					onFocus={clearErrors} {...other} />
			);
		} else {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent has-content" 
					{...other} />
			);
		}
	} else {
		if(error.length > 0) {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent error" onFocus={clearErrors} 
					{...other} />
			);
		} else {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent" {...other} />
			);
		}
	}
}

export default Input;
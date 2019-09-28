import React from 'react';
import './Input.css';
import InputMask from 'react-input-mask';

function Input({setInput, error, mask}) {

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
					className="bg-transparent has-content error" />
			);
		} else {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent has-content" />
			);
		}
	} else {
		if(error.length > 0) {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent error" />
			);
		} else {
			return (
				<InputMask mask={mask} onChange={inputChange}
					className="bg-transparent" />
			);
		}
	}
}

export default Input;
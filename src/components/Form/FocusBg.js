import React from 'react';
import styled from 'styled-components';

const FocusBgSpan = styled.span`
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

const FocusBg = React.memo(() => {
	return (
		<FocusBgSpan className="focus-bg" />
	)
});

export default FocusBg;
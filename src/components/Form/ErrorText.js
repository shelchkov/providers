import React from 'react';
import styled from 'styled-components';

const ErrorTextSmall = styled.small`
	color: #AAA;
	margin-bottom: -1rem;
`;

const ErrorText = React.memo(({message}) => {
	return (
		<ErrorTextSmall className="f6 black-60 db mt1">
			{message}
		</ErrorTextSmall>
	)
});

export default ErrorText;
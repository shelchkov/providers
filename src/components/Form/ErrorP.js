import React from 'react';
import styled from 'styled-components';

const StyledError = styled.p`
	color: #777;
`;

const ErrorP = React.memo(({errorMessage}) => {
	return (
		<StyledError className="mt0 f6" title="There was an error. Try Again">
			{errorMessage}
		</StyledError>
	)
});

export default ErrorP;
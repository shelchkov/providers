// HOC
import React from 'react';
import styled from 'styled-components';

// Centered container for the form with border and shadow
const Container = styled.div`
	border: 1px solid #AAC3BE;
	border-radius: .5rem;
	box-shadow: 0px 0px 38px -5px rgba(204,204,204,0.46);
	max-width: 286px;
	padding: 2rem;
	width: 50%;
	margin-left: auto;
	margin-right: auto;

	@media screen and (min-width: 30em) {
		width: 40%;
	}
`;

// Full height div
const WrapDiv = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

function FormContainer(WrappedComponent) {
	return class extends React.Component {
		render() {
			if(window.innerWidth > 500) {
				return (
					<WrapDiv>
						<Container>
							<WrappedComponent {...this.props} />
						</Container>
					</WrapDiv>
				);
			} else {
				return (
					<div className='vh-100 flex flex-column justify-center mw-240 center'>
						<WrappedComponent {...this.props} />
					</div>
				);
			}
		}
	};
}

export default FormContainer;
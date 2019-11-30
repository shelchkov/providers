import React from 'react';
import styled from 'styled-components';

const Logo = styled.img`
	width: 180px;
	
	&:hover {
		transform: scale(1.2);
		transition: transform 1s ease-out;
	}

	@media screen and (min-width: 550px) and (max-width: 750px) {
		width: 238px;
	}

	@media screen and (min-width: 751px) {
		width: 270px;
	}
`;

const ProviderDiv = styled.div`
	border: 1px solid #AAC3BE;
	width: 240px;
	height: 144px;
	box-shadow: 0px 0px 38px -5px rgba(204,204,204,0.46);

	@media screen and (min-width: 550px) and (max-width: 750px) {
		width: 320px;
		height: 180px;
	}

	@media screen and (min-width: 751px) {
		width: 440px;
		height: 180px;
	}
`;

const Provider = React.memo(({provider, selectProvider}) => {
	const clickHandler = () => {
		selectProvider(provider)
	}

	return (
		<ProviderDiv className="ma3 br3 pa3 ml-auto mr-auto pointer bg-white overflow-hidden flex flex-column justify-center overflow-hidden" 
			title={provider.name} onClick={clickHandler}>
			<div>
				<Logo src={provider.logo} alt={provider.name} />
			</div>
			<p>{provider.name}</p>
		</ProviderDiv>
	);
})

export default Provider;
import React from "react"
import styled from "styled-components"

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
`

const ProviderDiv = styled.div`
  border: 1px solid #aac3be;
  width: 240px;
  height: 144px;
  box-shadow: 0px 0px 38px -5px rgba(204, 204, 204, 0.46);

  @media screen and (min-width: 550px) and (max-width: 750px) {
    width: 320px;
    height: 180px;
  }

  @media screen and (min-width: 751px) {
    width: 440px;
    height: 180px;
  }
`

export const getSrcset = (provider, breakpoint) => {
  if (breakpoint === 1 || !provider.mobileLogo) {
    return provider.logo
  }

  return `${provider.mobileLogo} 550w, ${provider.logo} 1100w`
}

const ProviderMemo = ({ provider, selectProvider }) => (
  <ProviderDiv
    className="ma3 br3 pa3 ml-auto mr-auto pointer bg-white overflow-hidden flex flex-column justify-center overflow-hidden"
    title={provider.name}
    onClick={() => selectProvider(provider.id)}
  >
    <picture>
      <source srcSet={getSrcset(provider, 1)} media="(min-width: 550px)" />
      <Logo srcSet={getSrcset(provider, 0)} alt={provider.name} />
    </picture>
    <p>{provider.name}</p>
  </ProviderDiv>
)

export const Provider = React.memo(ProviderMemo)

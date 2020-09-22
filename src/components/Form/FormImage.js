import React from "react"
import styled from "styled-components"

const ImageContainer = styled.div`
  margin: 0.5rem 1rem 1rem 1rem;
`

const Image = styled.img`
  @media screen and (max-height: 400px) {
    width: 140px;
  }
`

// eslint-disable-next-line react/display-name
export const FormImage = React.memo(({ logo, name }) => (
  <ImageContainer>
    <Image src={logo} alt={name} title={name} />
  </ImageContainer>
))

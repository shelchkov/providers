import React from "react"
import styled from "styled-components"

// Centered container for the form with border and shadow
const Container = styled.div`
  max-width: 286px;

  @media (min-width: 501px) {
    border: 1px solid #aac3be;
    border-radius: 0.5rem;
    box-shadow: 0px 0px 38px -5px rgba(204, 204, 204, 0.46);
    padding: 2rem;
  }
`

// Full height div
const WrapDiv = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 500px) {
    max-width: 240px;
  }
`

export const FormContainer = ({ children }) => (
  <WrapDiv>
    <Container>{children}</Container>
  </WrapDiv>
)

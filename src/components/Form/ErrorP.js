import React from "react"
import styled from "styled-components"

const StyledError = styled.p`
  margin-top: 0;
  color: #777;
  font-size: 0.875rem;
`

// eslint-disable-next-line react/display-name
export const ErrorP = React.memo(({ errorMessage }) => (
  <StyledError title="There was an error. Try Again">
    {errorMessage}
  </StyledError>
))

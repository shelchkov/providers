import React from "react"
import styled from "styled-components"

const ErrorTextSmall = styled.small`
  display: block;
  margin-top: 0.25rem;
  margin-bottom: -0.3rem;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
`

// eslint-disable-next-line react/display-name
export const ErrorText = React.memo(({ message }) => (
  <ErrorTextSmall>{message}</ErrorTextSmall>
))

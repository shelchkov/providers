import React from "react"
import styled from "styled-components"

import { InputBase } from "./InputBase"
import { FocusBg } from "./FocusBg"
import { ErrorText } from "./ErrorText"

const InputContainer = styled.div`
  position: relative;
`

export const Input = ({ label, error, ...inputProps }) => (
  <>
    <InputContainer>
      <InputBase error={error} {...inputProps} />
      <label>{label}</label>
      <FocusBg />
    </InputContainer>

    {error && <ErrorText message={error} />}
  </>
)

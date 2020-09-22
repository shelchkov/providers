import React from "react"
import styled from "styled-components"

const FocusBgSpan = styled.span`
  &:before,
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    background-color: #ededed;
    transition: 0.3s;
    z-index: -1;
  }
`

// eslint-disable-next-line react/display-name
export const FocusBg = React.memo(() => (
  <FocusBgSpan className="focus-bg" />
))

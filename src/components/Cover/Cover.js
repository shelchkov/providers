import React from "react"
import styled from "styled-components"

const CoverContainer = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: 0;
  right: 0;
  bottom: ${(props) => props.bottom}px;

  background-color: #58af9b;

  transition: top 0.8s ease-in-out, bottom 0.5s ease-in-out;
`

const Cover = ({ top, bottom }) => (
  <CoverContainer top={top} bottom={bottom} />
)

export default Cover

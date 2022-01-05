import React from "react"
import styled from "styled-components"
import { ActiveBtn } from "../Button/Button"

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const refreshPage = () => {
  window.location.reload()
}

export const ErrorPage = () => (
  <Container>
    <p>Something went wrong</p>
    <ActiveBtn onClick={refreshPage}>Refresh</ActiveBtn>
  </Container>
)

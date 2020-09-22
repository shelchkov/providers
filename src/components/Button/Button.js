import styled from "styled-components"

const BaseButton = styled.button`
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  border-style: solid;
  border-width: 1px;
  border-radius: 0.5rem;
  outline: none;
  opacity: 0.9;
`

export const ActiveBtn = styled(BaseButton)`
  cursor: pointer;
  margin-left: auto;
  margin-right: auto;

  background-color: ${(p) => p.backgroundColor};
  color: ${(p) => p.color};

  &:hover,
  &:focus {
    transform: scale(0.96);
    transition: transform 0.12s ease-out, opacity 0.12s ease-out;
    box-shadow: 0px 0px 38px -5px rgba(204, 204, 204, 0.46);
    opacity: 1;
  }
`

export const NotAllowedBtn = styled(BaseButton)`
  margin-right: auto;
  margin-left: auto;
  color: #777;
  cursor: not-allowed;
`

export const GetBackBtn = styled(ActiveBtn)`
  margin-left: 0;
  color: #333;
  background-color: transparent;
  border-color: #ccc;
`

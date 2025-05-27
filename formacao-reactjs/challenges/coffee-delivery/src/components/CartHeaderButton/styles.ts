import { styled } from "styled-components";

const ButtonBase = styled.button`
  outline: none;
  border-style: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonShoppingCart = styled(ButtonBase)`
  position: relative;
  color: ${props => props.theme.colors["yellow-dark"]};
  background-color: ${props => props.theme.colors["yellow-light"]};

  span {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    width: 1.25rem;
    height: 1.25rem;
    background-color: ${props => props.theme.colors["yellow-dark"]};
    color: ${props => props.theme.colors.white};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.75rem;
    font-weight: bold;
    text-align: center;
  }
`
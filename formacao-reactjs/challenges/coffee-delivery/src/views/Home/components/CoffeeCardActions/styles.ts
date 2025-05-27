import { styled } from "styled-components";

export const CoffeeCardFooterCartButton = styled.button`
  border-style: none;
  background-color: ${props => props.theme.colors["purple-dark"]};
  color: ${props => props.theme.colors.white};
  padding: 0.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${props => props.theme.colors.purple};
  }
`
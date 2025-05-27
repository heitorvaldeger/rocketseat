
import { styled } from "styled-components";

type CoffeeQuantityButtonContainerProps = {
  height?: number | string,
}
export const CoffeeQuantityButtonContainer =
  styled.div<CoffeeQuantityButtonContainerProps>`
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background-color: ${props => props.theme.colors.button};
    padding: 0.5rem;
    border-radius: 6px;
    height: ${props => props.height};

    button {
      border-style: none;
      background-color: transparent;
      height: 0.875rem;
      color: ${props => props.theme.colors["purple"]};

      &:hover {
        color: ${props => props.theme.colors["purple-dark"]};
      }
    }

    p {
      width: 1.25rem;
      color: ${props => props.theme.colors.title};
      text-align: center;
      ${({ theme }) => theme.fonts.textM}
    }
  `
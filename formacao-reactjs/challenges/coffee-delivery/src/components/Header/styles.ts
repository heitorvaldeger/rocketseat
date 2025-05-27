import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 2rem 10rem;
  margin: auto;

  img {
    width: 84.95px;
    height: 40px;
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;

  button {
    padding: 0.5rem;
    height: 2.375rem;
  }
`

export const ButtonBase = styled.button`
  outline: none;
  border-style: none;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`
export const ButtonMap = styled(ButtonBase)`
  color: ${props => props.theme.colors["purple-dark"]};
  background-color: ${props => props.theme.colors["purple-light"]};
  ${({ theme }) => theme.fonts.textS}
`

export const ButtonShoppingCart = styled(ButtonBase)`
  color: ${props => props.theme.colors["yellow-dark"]};
  background-color: ${props => props.theme.colors["yellow-light"]};
`
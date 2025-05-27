import { styled } from "styled-components"

export const SectionTitle = styled.p`
  ${({ theme }) => theme.fonts.titleXS}
`

export const CoffeeSelectedSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
  min-width: 25.5rem;

  main {
    background-color: ${props => props.theme.colors.card};
    padding: 2.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 6px 44px 6px 44px;
  }
`

export const CoffeeSelectedSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  div {
    display: flex;
    justify-content: space-between;
    color: ${props => props.theme.colors.text};

    ${({ theme }) => theme.fonts.textM}
  }
`

export const CoffeeSelectedTotal = styled.div`
  p {
    ${({ theme }) => theme.fonts.textBoldL}
    color: ${props => props.theme.colors.subtitle}
  }
`

export const CoffeeSelectedConfirmOrder = styled.button`
  text-transform: uppercase;
  border: none;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.yellow};
  padding: 0.75rem 0.5rem;
  border-radius: 6px;
  ${({ theme }) => theme.fonts.buttonG}

  &:disabled {
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.label};
  }
`
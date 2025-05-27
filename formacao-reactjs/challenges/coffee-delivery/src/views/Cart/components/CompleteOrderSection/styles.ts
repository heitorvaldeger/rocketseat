import { styled } from "styled-components"


export const SectionTitle = styled.p`
  ${({ theme }) => theme.fonts.titleXS}
`

export const CompleteOrderSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.938rem;
  width: 40rem;
`

export const CompleteOrderSectionAddressContainer = styled.div`
  padding: 2.5rem;
  background-color: ${props => props.theme.colors.card};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`

export const CompleteOrderSectionAddressHeaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors["yellow-dark"]};
  }

  div p:first-child {
    color: ${props => props.theme.colors.subtitle};
    ${({ theme }) => theme.fonts.textM}
  }

  div p:last-child {
    color: ${props => props.theme.colors.text};
    ${({ theme }) => theme.fonts.textS}
  }
`

export const CompleteOrderSectionAddressFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    gap: 0.75rem;
  }

  input {
    padding: 0.75rem;
    border-radius: 4px;
    outline: none;
    border-style: none;
    background-color: ${props => props.theme.colors.input};
    border: 1px solid ${props => props.theme.colors.button};
    ${({ theme }) => theme.fonts.textS}
  }

  input:focus {
    border: 1px solid ${props => props.theme.colors["yellow-dark"]};
  }

  input#cep {
    width: calc(100% - 360px)
  }

  input#district, input#number {
    min-width: calc(100% - 360px);
  }

  input#city {
    min-width: calc(100% - 284px);
    flex: 1;
  }

  input#state {
    min-width: calc(100% - 500px);
  }

  input#complement {
    min-width: calc(100% - 212px);
    flex: 1;
  }
`

export const CompleteOrderSectionPaymentContainer = styled.div`
  padding: 2.5rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: ${props => props.theme.colors.card};
`

export const CompleteOrderSectionPaymentHeaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  
  svg {
    color: ${props => props.theme.colors["purple"]};
  }

  div p:first-child {
    color: ${props => props.theme.colors.subtitle};
    ${({ theme }) => theme.fonts.textM}
  }

  div p:last-child {
    color: ${props => props.theme.colors.text};
    font-size: 0.875rem;
    ${({ theme }) => theme.fonts.textS}
  }
`

export const CompleteOrderSectionPaymentList = styled.div`
  list-style: none;
  display: flex;
  gap: 0.75rem;
  width: 100%;
`
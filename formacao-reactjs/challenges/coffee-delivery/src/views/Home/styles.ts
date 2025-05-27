
import styled from "styled-components";
export const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`
export const TopContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3.5rem;

  img {
    width: 29.75rem;
    height: 22.5rem;

    @media (max-width: 1200px) {
      display: none;
    }
  }
`

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4.125rem;
`

export const SectionInfo = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 588px;
  height: 192px;

  p:first-child {
    ${({ theme }) => theme.fonts.titleXL}
  }

  p:last-child {
    ${({ theme }) => theme.fonts.textL}
  }
`

export const SectionDetails = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    span {
      color: ${props => props.theme.colors.text};
      ${({ theme }) => theme.fonts.textM}
    }
  }
`

export const IconContainer = styled.div`
  svg {
    padding: 0.5rem;
    border-radius: 50%;
    color: ${props => props.theme.colors.white}
  }
`
export const ShoppingCartContainer = styled(IconContainer)`
  svg {
    background-color: ${props => props.theme.colors["yellow-dark"]};
  }
`

export const PackageContainer = styled(IconContainer)`
  svg {
    background-color: ${props => props.theme.colors.text};
  }
`
export const TimerContainer = styled(IconContainer)`
  svg {
    background-color: ${props => props.theme.colors.yellow};
  }
`
export const CoffeeContainer = styled(IconContainer)`
  svg {
    background-color: ${props => props.theme.colors.purple};
  }
`

export const CoffeeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.375rem;
  & > p {
    ${({ theme }) => theme.fonts.titleL}
  }

  ul {
    display: grid;
    row-gap: 2.5rem;
    column-gap: 2rem;
    grid-template-columns: repeat(4, 1fr);
    list-style: none;

    @media (max-width: 992px){
      grid-template-columns: repeat(2, 1fr);
    }
    @media (max-width: 1200px){
      grid-template-columns: repeat(3, 1fr);
    }
  }
`
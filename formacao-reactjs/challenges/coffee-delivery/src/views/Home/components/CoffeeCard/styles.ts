import { mixins } from "@/assets/styles/mixins"
import styled from "styled-components"
export const CoffeeCardContainer = styled.div`
  width: 256px;
  height: 310px;
  border-radius: 6px 36px 36px 6px;
  background-color: ${props => props.theme.colors.card};

  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  img {
    position: relative;
    margin-top: -1.125rem;
    width: 120px;
  }
`

export const CoffeeCardBadge = styled.span`
  background-color: ${props => props.theme.colors["yellow-light"]};
  color: ${props => props.theme.colors["yellow-dark"]};
  padding: 0.25rem 0.5rem;
  border-radius: 100px;
  text-transform: uppercase;
  ${({ theme }) => theme.fonts.tag}
`

export const CoffeeCardBadgeContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`

export const CoffeeCardTitle = styled.p`
  ${({ theme }) => theme.fonts.titleS}
  width: 216px;
`

export const CoffeeCardDescription = styled.p`
  color: ${props => props.theme.colors.label};
  width: 216px;
  ${({ theme }) => theme.fonts.textS}
`

export const CoffeeCardFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 208px;

  div:last-child {
    display: flex;
    gap: 0.5rem;
  }
`
export const CoffeeCardFooterPrice = styled.p`
  &:first-child {
    ${({ theme }) => theme.fonts.textS}
  }

  span {
    ${({ theme }) => theme.fonts.titleM}
    color: ${props => props.theme.colors.text};
  }
`
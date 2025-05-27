import { mixins } from "@/assets/styles/mixins"
import { styled } from "styled-components"

export const CoffeeSelectedListItemContainer = styled.li`
  padding: 0.5rem 0.25rem;
  display: flex;
  list-style: none;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  &:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.button};
  }

  img {
    width: 64px;
    height: 64px;
  }
`

export const CoffeeSelectedListItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    ${({ theme }) => theme.fonts.textM}
  }
`

export const CoffeeSelectedListItemPrice = styled.p`
  ${({ theme }) => theme.fonts.textBoldM}
`

export const CoffeeSelectedListItemDescription = styled.div`
  display: flex;
  gap: 1.25rem;
`

export const CoffeeSelectedListItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 2rem;
`

export const CoffeeSelectedListItemActionDelete = styled.button`
  padding: 0rem 0.5rem;
  border: none;
  background-color: ${props => props.theme.colors.button};
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-transform: uppercase;
  color: ${props => props.theme.colors.text};
  ${({ theme }) => theme.fonts.buttonM}

  &:hover {
    background-color: ${props => props.theme.colors.hover};
  }
  svg {
    color: ${props => props.theme.colors.purple}
  }
`
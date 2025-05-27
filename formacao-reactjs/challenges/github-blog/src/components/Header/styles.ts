import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: ${({ theme }) => theme.colors["base-profile"]};
  height: 296px;
`

export const HeaderLogoImage = styled.img`
  margin-bottom: 4rem;
`
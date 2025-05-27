import styled from "styled-components";

export const IssueContainer = styled.main`

  article {
    padding: 2rem 2.5rem;
    color: ${({ theme }) => theme.colors["base-text"]};
    margin-top: -4rem;
    background-color: transparent;
    ${({ theme }) => theme.fonts.textM}
  }
`
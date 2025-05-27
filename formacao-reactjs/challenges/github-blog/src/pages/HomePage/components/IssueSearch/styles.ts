import styled from "styled-components";

export const PostSearchForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span:first-child {
      ${({ theme }) => theme.fonts.titleS}
      color: ${({ theme }) => theme.colors["base-subtitle"]};
    }

    span:last-child {
      ${({ theme }) => theme.fonts.textS}
      color: ${({ theme }) => theme.colors["base-span"]};
    }
  }

  input {
    padding: 1rem 0.75rem;
    background-color: ${({ theme }) => theme.colors["base-input"]};
    border: 1px solid ${({ theme }) => theme.colors["base-border"]};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors["base-label"]};
    ${({ theme }) => theme.fonts.textM}
  }
`
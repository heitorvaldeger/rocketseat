import styled from "styled-components";

export const IssueHeaderContainer = styled.div`
  width: 864px;
  background-color: ${({ theme }) => theme.colors["base-profile"]};
  color: ${({ theme }) => theme.colors["base-text"]};
  border-radius: 10px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;

  box-shadow: 0px 2px 28px 0px rgba(0,0,0,0.2);

  position: static;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    button, a {
      background-color: transparent;
      outline: none;
      border: none;
      cursor: pointer;
      text-decoration: none;

      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-transform: uppercase;
      color: ${({ theme }) => theme.colors.blue};
      ${({ theme }) => theme.fonts.link}
    }
  }

  main {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.colors["base-title"]};
    ${({ theme }) => theme.fonts.titleL}
  }

  footer {
    display: flex;
    align-items: center;
    gap: 2rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      ${({ theme }) => theme.fonts.textM}
      color: ${({ theme }) => theme.colors["base-span"]};

      svg {
        color: ${({ theme }) => theme.colors["base-label"]};
      }
    }
  }
`
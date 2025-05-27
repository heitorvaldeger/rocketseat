import styled from "styled-components";

export const CardContainer = styled.div`
  width: 416px;
  height: 260px;
  background-color: ${({ theme }) => theme.colors["base-post"]};
  border-radius: 10px;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 2rem;

    span:first-child {
      ${({ theme }) => theme.fonts.titleM}
      color: ${({ theme }) => theme.colors["base-title"]};
      flex: 1;
      cursor: pointer;
    }

    span:last-child {
      ${({ theme }) => theme.fonts.textS}
      color: ${({ theme }) => theme.colors["base-span"]};
    }
  }

  p {
    ${({ theme }) => theme.fonts.textM}
    color: ${({ theme }) => theme.colors["base-text"]};

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
import styled from "styled-components";

export const ProfileContainer = styled.div`
  width: 864px;
  background-color: ${({ theme }) => theme.colors["base-profile"]};
  color: ${({ theme }) => theme.colors["base-text"]};
  border-radius: 10px;
  padding: 2rem;

  display: flex;
  align-items: center;
  gap: 2rem;

  box-shadow: 0px 2px 28px 0px rgba(0,0,0,0.2);

  position: static;
  top: 50%;
  left: 50%;
  transform: translate(0%, -50%);

  img {
    width: 148px;
    border-radius: 8px;
  }
`

export const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex: 1;
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      outline: none;
      border: none;
      background-color: transparent;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      text-decoration: none;

      color: ${({ theme }) => theme.colors.blue};
      ${({ theme }) => theme.fonts.link}
    }
  }
`

export const ProfileName = styled.span`
  color: ${({ theme }) => theme.colors["base-title"]};

  ${({ theme }) => theme.fonts.titleL}
`

export const ProfileFooter = styled.footer`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  span {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`
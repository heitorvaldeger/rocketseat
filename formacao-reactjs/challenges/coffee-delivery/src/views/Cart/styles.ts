import styled from "styled-components";
export const FormContainer = styled.form`
  display: flex;
  gap: 2rem;

  @media (max-width: 1220px) {
    flex-direction: column;
    align-items: center;
  }
`
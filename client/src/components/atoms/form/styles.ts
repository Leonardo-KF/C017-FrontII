import styled from "styled-components";

export const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    min-width: 300px;
    width: 50%;
  }
`;
export type InputProps = {
  error?: boolean;
};

export const PersonalizedInput = styled.input<InputProps>`
  display: flex;
  width: 90%;
  margin: 0.5rem;
  border-radius: 0.2rem;
  border: none;
  border: ${(props) => (props.error ? "1px solid red" : "1px solid #ccc")};
  padding-left: 0.3rem;
`;

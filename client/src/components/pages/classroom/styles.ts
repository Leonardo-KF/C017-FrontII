import styled from "styled-components";

type clickedButtonProps = {
  isSelect: boolean;
};

export const ClickedButton = styled.button<clickedButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  border: 3px solid ${(props) => (props.isSelect ? "green" : "red")};
  border-radius: 10px;
`;

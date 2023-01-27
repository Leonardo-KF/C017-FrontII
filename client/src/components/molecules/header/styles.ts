import styled from "styled-components";

export const HeaderDiv = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  background-color: ${({ theme }) => theme.lightTheme.bg};
  color: ${({ theme }) => theme.lightTheme.fg};
  justify-content: space-between;
  padding: 4px;
  align-items: center;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0 6px;
    height: 100%;
    border-radius: 5px;
    margin: 0 4px;

    :hover {
      background-color: ${({ theme }) => theme.lightTheme.fg};
      color: ${({ theme }) => theme.lightTheme.bg};
    }

    transition: 0.3s ease-in-out;
  }
`;

export const HeaderDivButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 100%;
  /* width: 20%; */
`;

export const HeaderDivTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 100%;

  img {
    display: flex;
    height: 100%;
    margin: 0 5px;
  }
`;

import styled from "styled-components";

export const ClassroomDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const ClassroomFilterDiv = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  height: 20%;

  @media (max-width: 768px) {
    width: 100%;
  }

  div {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    select {
      display: flex;
      border: none;
      cursor: pointer;
      background-color: ${({ theme }) => theme.lightTheme.bg};
      color: ${({ theme }) => theme.lightTheme.fg};
      padding: 1px 6px;
      margin: 2px;
      @media (max-width: 768px) {
        height: 1.7rem;
      }
    }
  }
`;

export const ClassroomInput = styled.input`
  display: flex;
  @media (max-width: 768px) {
    width: 90%;
    height: 1.7rem;
  }
`;

export const ClassroomContentDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 80%;
  height: 100%;
`;

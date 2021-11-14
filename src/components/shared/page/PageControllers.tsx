import styled from 'styled-components';

export const ControllersContainer = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
`;

export const ControllersGroup = styled.div`
  display: flex;
  & > .MuiButtonBase-root {
    margin-right: 1rem;
  }
`;

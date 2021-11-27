import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > * {
    margin-top: 1rem;
    width: 30rem;
  }
`;

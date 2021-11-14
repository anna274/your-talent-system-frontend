import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ChooseArea = styled.div`
  display: flex;
  flex-direction: row;

  .MuiAutocomplete-root {
    margin-right: 1rem;
  }
`;

export const SelectedOptions = styled.div`
  display: flex;
  flexwrap: wrap;
  margin-bottom: 2rem;
`;

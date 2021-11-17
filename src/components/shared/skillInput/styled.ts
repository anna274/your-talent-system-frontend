import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  & .MuiFormControl-root.levels {
    width: 20rem !important;
  }

  & .skill-chip {
    & .MuiChip-label {
      display: flex;
      align-items: center;

      & .MuiRating-root {
        margin-left: 0.5rem;
      }
    }
  }
`;

export const ChooseArea = styled.div`
  display: flex;
  flex-direction: row;

  .MuiFormControl-root {
    margin-right: 1rem;
  }
`;

export const SelectedOptions = styled.div`
  display: flex;
  flexwrap: wrap;
  margin-bottom: 2rem;
`;

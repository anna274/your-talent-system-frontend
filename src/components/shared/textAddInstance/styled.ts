import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  & .MuiFormControl-root.levels,
  .MuiFormControl-root.priorities {
    width: 20rem !important;
  }

  & .requirement-chip {
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
  margin-bottom: 2rem;
  flex-direction: column;

  .MuiChip-root {
    justify-content: flex-start;
    margin-bottom: 0.5rem;
    width: fit-content;
  }
`;

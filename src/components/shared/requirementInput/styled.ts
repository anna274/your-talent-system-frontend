import styled from 'styled-components';

const prioritiesColors = {
  '1': '#52B792',
  '2': '#EEB34E',
  '3': '#C65942',
};

const getColor = (priority: number) => {
  if (priority) {
  }
};

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
  flex-wrap: wrap;
  margin-bottom: 2rem;

  .MuiChip-root {
    margin-right: 0.5rem;

    & .MuiChip-label {
      margin-left: 0.5rem;
    }

    & .MuiSvgIcon-root.color-1 {
      fill: #52b792;
      margin-left: 0.5rem;
    }
    & .MuiSvgIcon-root.color-2 {
      fill: #eeb34e;
      margin-left: 0.5rem;
    }
    & .MuiSvgIcon-root.color-3 {
      fill: #c65942;
      margin-left: 0.5rem;
    }
  }
`;

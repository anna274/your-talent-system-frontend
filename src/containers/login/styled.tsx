import styled from 'styled-components';
import { Form as LibraryForm } from 'formik';
import { COLORS, DEVIСES_WIDTH } from 'consts';

export const Form = styled(LibraryForm)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  background-color: ${COLORS.color_dark_secondary};
  padding: 5rem 3rem;
  box-sizing: border-box;

  @media (max-width: ${DEVIСES_WIDTH.tablet}) {
    & > * {
      width: 100%;
      padding: 3rem 2rem;
    }
  }

  .MuiTextField-root {
    width: 100%;
    margin-bottom: 2rem;
  }

  .MuiButton-root {
    margin-top: 2rem;
    width: 20rem;
  }
`;

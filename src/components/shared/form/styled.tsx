import styled from 'styled-components';
import { Form as LibraryForm } from 'formik';
import { DEVIСES_WIDTH } from 'consts';

export const Form = styled(LibraryForm)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: ${DEVIСES_WIDTH.tablet}) {
    & > * {
      width: 100%;
      padding: 3rem 2rem;
    }
  }

  .MuiTextField-root {
    width: 30rem;
    margin-bottom: 2rem;
  }

  .multiline.MuiTextField-root {
    width: 100%;
  }

  .MuiButton-root {
    margin-right: 1rem;
    width: 20rem;
  }
`;

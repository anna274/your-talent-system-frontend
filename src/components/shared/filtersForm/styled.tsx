import styled from 'styled-components';
import { Form as LibraryForm } from 'formik';
import { COLORS } from 'consts';

export const Container = styled.div`
  .MuiButton-root {
    color: ${COLORS.color_text_dim};
    margin-bottom: 1rem;
  }
`;

export const Form = styled(LibraryForm)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FormFields = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;

  .MuiTextField-root {
    width: 22rem;
    margin-right: 2rem;
  }

  .multiline.MuiTextField-root {
    width: 100%;
  }

  .MuiButton-root {
    margin-right: 1rem;
    width: 20rem;
  }

  .MuiFormControl-root.custom {
    width: 22rem;
    margin-right: 2rem;
  }

  & .MuiInputLabel-filled.MuiInputLabel-shrink {
    transform: translate(12px, 6px) scale(0.75);
  }

  & .MuiFilledInput-input {
    padding-top: 15px;
  }

  & .MuiFormLabel-root {
    line-height: 0.5rem;
  }
`;

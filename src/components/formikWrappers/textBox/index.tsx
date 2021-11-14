import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import MUITextField from '@material-ui/core/TextField';

interface IProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
}

export const TextBox: React.FC<IProps> = ({ name, label, required = false, type = 'text' }) => {
  return (
    <Field name={name}>
      {({
        field: { name, value, onChange },
        form: { setFieldTouched, errors, touched },
      }: FieldProps) => (
        <MUITextField
          id={name}
          variant="filled"
          name={name}
          label={label}
          required={required}
          value={value}
          multiline
          minRows={6}
          onChange={(event: React.ChangeEvent<any>) => {
            onChange(event);
            setFieldTouched(name, false, false);
          }}
          error={getIn(touched, name) ? getIn(errors, name) : null}
          helperText={getIn(touched, name) ? getIn(errors, name) : null}
          type={type}
          className="multiline"
        />
      )}
    </Field>
  );
};

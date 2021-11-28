import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import MUITextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

interface IProps {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  isSearch?: boolean;
}

export const TextField: React.FC<IProps> = ({
  name,
  label,
  required = false,
  type = 'text',
  isSearch = false,
}) => {
  const InputProps = isSearch
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }
    : {};

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
          onChange={(event: React.ChangeEvent<any>) => {
            onChange(event);
            setFieldTouched(name, false, false);
          }}
          error={getIn(touched, name) ? getIn(errors, name) : null}
          helperText={getIn(touched, name) ? getIn(errors, name) : null}
          type={type}
          InputProps={InputProps}
        />
      )}
    </Field>
  );
};

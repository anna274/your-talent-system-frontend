import React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { Select } from 'components/shared/select';

interface IProps {
  name: string;
  label: string;
  options: any[];
  getOptionLabel: (option: any) => string;
  withClean?: boolean;
  selectCallback?: (option: any) => void;
}

export const SelectField: React.FC<IProps> = ({
  name,
  label,
  getOptionLabel,
  options,
  withClean,
  selectCallback,
}) => {
  return (
    <Field name={name}>
      {({
        field: { name, value },
        form: { setFieldTouched, setFieldValue, errors, touched },
      }: FieldProps) => (
        <Select
          id={name}
          label={label}
          value={value}
          options={options}
          getOptionLabel={getOptionLabel}
          onChange={(event: React.ChangeEvent<any>) => {
            setFieldValue(name, event.target.value);
            setFieldTouched(name, false, false);
            selectCallback && selectCallback(event.target.value);
          }}
          error={getIn(touched, name) ? getIn(errors, name) : null}
          helperText={getIn(touched, name) ? getIn(errors, name) : null}
          withClean={withClean}
        />
      )}
    </Field>
  );
};

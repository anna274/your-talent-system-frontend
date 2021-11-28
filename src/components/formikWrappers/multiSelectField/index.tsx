import * as React from 'react';
import { Field, FieldProps, getIn } from 'formik';
import { MultiSelect } from 'components/shared';

interface IProps {
  options: any[];
  getOptionLabel: (option: any) => string;
  label: string;
  name: string;
}

export const MultiSelectField: React.FC<IProps> = ({ name, label, options, getOptionLabel }) => {
  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue, touched, errors } }: FieldProps) => (
        <MultiSelect
          options={options}
          label={label}
          id={name}
          getOptionLabel={getOptionLabel}
          onChange={(event: React.ChangeEvent<any>) => {
            setFieldValue(name, event.target.value);
          }}
          value={value}
          error={getIn(touched, name) ? getIn(errors, name) : null}
        />
      )}
    </Field>
  );
};

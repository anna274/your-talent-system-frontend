import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { AddInstance } from 'components/shared';

interface IProps {
  options: any[];
  getOptionLabel: (option: any) => string;
  label: string;
  name: string;
}

export const AddInstanceField: React.FC<IProps> = ({ name, label, options, getOptionLabel }) => {
  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => (
        <AddInstance
          options={options}
          label={label}
          name={name}
          getOptionLabel={getOptionLabel}
          onChange={(updatedValue) => setFieldValue(name, updatedValue)}
          selectedOptions={value}
        />
      )}
    </Field>
  );
};

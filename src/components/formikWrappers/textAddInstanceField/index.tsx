import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { TextAddInstance } from 'components/shared';

interface IProps {
  name: string;
  label: string;
}

export const TextAddInstanceField: React.FC<IProps> = ({ name, label }) => {
  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => (
        <TextAddInstance
          name={name}
          label={label}
          onChange={(updatedValue) => setFieldValue(name, updatedValue)}
          texts={value}
        />
      )}
    </Field>
  );
};

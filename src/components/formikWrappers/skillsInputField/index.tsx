import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { SkillInput } from 'components/shared';
import { ILevel, ITechnology } from 'declarations/interfaces';

interface IProps {
  name: string;
  levels: ILevel[];
  technologies: ITechnology[];
}

export const SkillsInputField: React.FC<IProps> = ({ name, levels, technologies }) => {
  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => (
        <SkillInput
          name={name}
          onChange={(updatedValue) => setFieldValue(name, updatedValue)}
          skills={value}
          levels={levels}
          technologies={technologies}
        />
      )}
    </Field>
  );
};

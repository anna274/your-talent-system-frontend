import * as React from 'react';
import { Field, FieldProps } from 'formik';
import { RequirementInput } from 'components/shared';
import { ILevel, IPriority, ITechnology } from 'declarations/interfaces';

interface IProps {
  name: string;
  levels: ILevel[];
  technologies: ITechnology[];
  priorities: IPriority[];
}

export const RequirementsInputField: React.FC<IProps> = ({
  name,
  levels,
  technologies,
  priorities,
}) => {
  return (
    <Field name={name}>
      {({ field: { name, value }, form: { setFieldValue } }: FieldProps) => (
        <RequirementInput
          name={name}
          onChange={(updatedValue) => setFieldValue(name, updatedValue)}
          requirements={value}
          levels={levels}
          technologies={technologies}
          priorities={priorities}
        />
      )}
    </Field>
  );
};

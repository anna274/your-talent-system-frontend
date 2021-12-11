import React from 'react';
import { Field, FieldProps } from 'formik';
import { ImagePreview } from 'components/shared';

interface IProps {
  name: string;
  label: string;
  imageURL: string;
  onClear: () => void;
}
export const ImagePreviewField: React.FC<IProps> = ({ name, ...props }) => {
  return (
    <Field name={name}>
      {({ field: { name }, form: { setFieldValue } }: FieldProps) => {
        return (
          <ImagePreview
            {...props}
            name={name}
            changeHandler={(event: React.ChangeEvent<any>) => {
              setFieldValue(name, event.target.files[0]);
            }}
            onClear={() => setFieldValue(name, '')}
          />
        );
      }}
    </Field>
  );
};

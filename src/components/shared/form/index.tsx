import React from 'react';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { PageTitle, ControllersGroup } from 'components/shared/page';
import {
  TextField,
  TextBox,
  DatePicker,
  AddInstanceField,
  SelectField,
  SkillsInputField,
  RequirementsInputField,
  TextAddInstanceField,
  ImagePreviewField,
  MultiSelectField,
} from 'components/formikWrappers';
import { goBack } from 'customHistory';
import { Form } from './styled';

interface IField {
  id: string;
  type: string;
  props: any;
}

interface IProps {
  fields: IField[];
  onSubmit: (values: any) => void;
  formTitle: string;
  validate?: (values: any) => void;
  validationSchema?: any;
  initialValues: object;
  saveBtnText?: string;
}

const FIELDS_MAPPING = {
  textField: TextField,
  textBox: TextBox,
  datePicker: DatePicker,
  addInstance: AddInstanceField,
  select: SelectField,
  skillsInput: SkillsInputField,
  requirementInput: RequirementsInputField,
  textAddInstance: TextAddInstanceField,
  imagePreview: ImagePreviewField,
  multiSelect: MultiSelectField,
};

const getField = ({ id, type, props }: IField) => {
  //@ts-ignore
  const Element = FIELDS_MAPPING[type];
  return <Element key={id} {...props} />;
};

export const GeneralForm: React.FC<IProps> = ({
  fields,
  validate,
  onSubmit,
  formTitle,
  initialValues,
  saveBtnText,
  validationSchema,
}) => {
  const formProps = {
    initialValues,
    onSubmit,
    ...(validate ? { validate } : {}),
    ...(validationSchema ? { validationSchema } : {}),
  };
  return (
    <Formik {...formProps}>
      <Form>
        <PageTitle>{formTitle}</PageTitle>
        {fields.map((field) => getField(field))}
        <ControllersGroup>
          <Button type="submit" variant="contained">
            {saveBtnText || 'Сохранить'}
          </Button>
          <Button onClick={goBack} variant="contained" color="secondary">
            Отмена
          </Button>
        </ControllersGroup>
      </Form>
    </Formik>
  );
};

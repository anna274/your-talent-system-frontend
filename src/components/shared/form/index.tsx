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
  validate: (values: any) => void;
  initialValues: object;
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
}) => {
  return (
    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
      <Form>
        <PageTitle>{formTitle}</PageTitle>
        {fields.map((field) => getField(field))}
        <ControllersGroup>
          <Button type="submit" variant="contained">
            Сохранить
          </Button>
          <Button onClick={goBack} variant="contained" color="secondary">
            Отмена
          </Button>
        </ControllersGroup>
      </Form>
    </Formik>
  );
};

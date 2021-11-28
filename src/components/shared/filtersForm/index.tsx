import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Formik } from 'formik';
import { ControllersGroup } from 'components/shared/page';
import {
  TextField,
  TextBox,
  DatePicker,
  AddInstanceField,
  SelectField,
  SkillsInputField,
  RequirementsInputField,
  TextAddInstanceField,
  MultiSelectField,
} from 'components/formikWrappers';
import { Form, FormFields, Container } from './styled';

interface IField {
  id: string;
  type: string;
  props: any;
}

interface IProps {
  fields: IField[];
  onSubmit: (values: any) => void;
  onReset: (values: any) => void;
  initialValues: object;
  isOpen?: boolean;
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
  multiSelect: MultiSelectField,
};

const getField = ({ id, type, props }: IField) => {
  //@ts-ignore
  const Element = FIELDS_MAPPING[type];
  return <Element key={id} {...props} />;
};

export const FiltersForm: React.FC<IProps> = ({
  fields,
  onSubmit,
  onReset,
  initialValues,
  isOpen: isOpenInitial = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenInitial);
  return (
    <Container>
      <Button type="submit" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Спрятать фильтры' : 'Показать фильтры'}
      </Button>
      {isOpen && (
        <Formik initialValues={initialValues} onSubmit={onSubmit} onReset={onReset}>
          <Form>
            <FormFields>{fields.map((field) => getField(field))}</FormFields>
            <ControllersGroup>
              <Button type="submit">Применить фильтры</Button>
              <Button type="reset">Сбросить фильтры</Button>
            </ControllersGroup>
          </Form>
        </Formik>
      )}
    </Container>
  );
};

import * as React from 'react';
import { Field, getIn, FieldProps } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { ru } from 'date-fns/locale';

interface IProps {
  onDateChange: (date: Date) => void;
  value: Date;
  label: string;
  name: string;
}

export const DatePicker: React.FC<IProps> = ({ name, label }) => {
  return (
    <Field name={name}>
      {({
        field: { name, value },
        form: { setFieldValue, setFieldTouched, errors, touched },
      }: FieldProps) => (
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ru}>
          <KeyboardDatePicker
            label={label}
            inputVariant="filled"
            color="secondary"
            value={value}
            onChange={(newDate: any) => {
              setFieldValue(name, newDate);
              setFieldTouched(name, false, false);
            }}
            format="dd/MM/yyyy"
            name={name}
            error={getIn(touched, name) ? getIn(errors, name) : null}
            helperText={getIn(touched, name) ? getIn(errors, name) : null}
          />
        </MuiPickersUtilsProvider>
      )}
    </Field>
  );
};

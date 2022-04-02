import * as yup from 'yup';

export const validationSchema = yup.object({
  applicationDate: yup.date().typeError('Некорректный формат даты').required('Обязательное поле'),
  job_function: yup
    .object()
    .typeError('Обязательное поле')
    .test('empty-check', 'Обязательное поле', (value: any) => Object.keys(value).length !== 0),
  project: yup
    .object()
    .typeError('Обязательное поле')
    .test('empty-check', 'Обязательное поле', (value: any) => Object.keys(value).length !== 0),
});

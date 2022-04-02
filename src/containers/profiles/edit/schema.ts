import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Минимальная длина поля 2 символа')
    .max(25, 'максимальная длина поля 25 символов')
    .required('Обязательное поле'),
  surname: yup
    .string()
    .min(2, 'Минимальная длина поля 2 символа')
    .max(25, 'максимальная длина поля 25 символов')
    .required('Обязательное поле'),
  patronymic: yup
    .string()
    .min(2, 'Минимальная длина поля 2 символа')
    .max(25, 'максимальная длина поля 25 символов')
    .required('Обязательное поле'),
  email: yup.string().email().typeError('Некорректный формат почты').required('Обязательное поле'),
  careerStartDate: yup.date().typeError('Некорректный формат даты').required('Обязательное поле'),
  companyStartDate: yup.date().typeError('Некорректный формат даты').required('Обязательное поле'),
  job_function: yup
    .object()
    .test('empty-check', 'Обязательное поле', (value: any) => Object.keys(value).length !== 0),
  department: yup
    .object()
    .test('empty-check', 'Обязательное поле', (value: any) => Object.keys(value).length !== 0),
});

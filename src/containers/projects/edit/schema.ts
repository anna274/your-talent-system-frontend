import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Минимальная длина поля 2 символа')
    .max(25, 'максимальная длина поля 25 символов')
    .required('Обязательное поле'),
  description: yup.string().max(250, 'максимальная длина поля 250 символов'),
  startDate: yup.date().typeError('Некорректный формат даты').required('Обязательное поле'),
  endDate: yup.date().typeError('Некорректный формат даты'),
});

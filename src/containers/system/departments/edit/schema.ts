import * as yup from 'yup';

export const validationSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Минимальная длина поля 2 символа')
    .max(25, 'максимальная длина поля 25 символов')
    .required('Обязательное поле'),
});

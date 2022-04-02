import * as yup from 'yup';

export const validationSchema = yup.object({
  access: yup
    .object()
    .test('empty-check', 'Обязательное поле', (value: any) => Object.keys(value).length !== 0),
});

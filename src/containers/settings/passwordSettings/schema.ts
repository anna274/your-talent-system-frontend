import * as yup from 'yup';

export const validationSchema = yup.object({
  currentPassword: yup.string().required('Обязательное поле'),
  newPassword: yup
    .string()
    .min(6, 'Минимальная длина пароля 6 символов')
    .max(25, 'максимальная длина пароля 25 символов')
    .required('Обязательное поле'),
  confirmNewPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('newPassword'), null], 'Пароли дожны совпадать'),
});

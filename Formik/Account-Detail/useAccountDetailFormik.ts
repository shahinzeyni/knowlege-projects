import { useFormik } from 'formik';
import * as yup from 'yup';
import configYup from '@/configs/yup.config';

export type IAccountDetailValues = {
  email: string;
  fullName: string;
  mobile: string;
  birthDate: string;
};

export const useAccountDetailForm = (submitHandler: (values: IAccountDetailValues) => void) => {
  configYup();

  const validateSchema = yup.object({
    email: yup.string().email().default(''),
    fullName: yup.string().default(''),
    mobile: yup.string().min(11).max(13).default(''),
    birthDate: yup.string().default(''),
  });

  return useFormik({
    initialValues: validateSchema.getDefault() as IAccountDetailValues,
    validateOnChange: false,
    validationSchema: validateSchema,
    onSubmit(values) {
      submitHandler(values);
    },
  });
};

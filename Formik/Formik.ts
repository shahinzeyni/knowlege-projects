import { useFormik } from 'formik';
import * as yup from 'yup';
import configYup from '@/configs/yup.config';

export type ILoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export const useLoginForm = (submitHandler: (values: ILoginFormValues) => void) => {
  configYup();

  const validateSchema = yup.object({
    email: yup.string().email().required().default(''),
    password: yup.string().min(8).max(16).required().default(''),
    remember: yup.bool().required().default(false),
  });

  return useFormik({
    initialValues: validateSchema.getDefault() as ILoginFormValues,
    validateOnChange: false,
    validationSchema: validateSchema,
    onSubmit(values) {
      submitHandler(values);
    },
  });
};

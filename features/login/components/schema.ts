import * as Yup from "yup";

import YupPassword from "yup-password";
YupPassword(Yup);

export const LoginValidationSchema = Yup.object().shape({
   email: Yup.string().email().required("Email is required"),
   password: Yup.string()
      .min(8)
      .minUppercase(1)
      .minNumbers(1)
      .minLowercase(1)
      .minSymbols(0)
      .required("Password is required"),
});
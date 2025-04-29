import * as Yup from "yup";

export const ForgotPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

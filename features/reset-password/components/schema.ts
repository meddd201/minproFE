import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .min(8)
    .minUppercase(1)
    .minNumbers(1)
    .minLowercase(1)
    .minSymbols(0)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .min(8)
    .minUppercase(1)
    .minNumbers(1)
    .minLowercase(1)
    .minSymbols(0)
    .required("Password is required"),
});

import * as Yup from "yup";

import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 20 characters long")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers")
    .required("Username is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .min(8)
    .minUppercase(1)
    .minNumbers(1)
    .minLowercase(1)
    .minSymbols(0)
    .required("Password is required"),
  confirmPassword: Yup.string()
    .equals([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required").min(8)
    .minUppercase(1)
    .minNumbers(1)
    .minLowercase(1)
    .minSymbols(0)
    .required("Password is required"),
});

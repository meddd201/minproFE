import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const RegisterOrganizerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z0-9 ]*$/)
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: Yup.string().required("Description is required"),
  bankTarget: Yup.string().required("BankTarget is required"),
  paymentTarget: Yup.number().required("PaymentTarget is required"),
  organizerPict: Yup.mixed().nullable(),
});
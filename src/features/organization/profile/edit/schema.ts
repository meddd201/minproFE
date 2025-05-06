import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const EditOrganizerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[a-zA-Z0-9 ]*$/)
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  description: Yup.string().required("Description is required").min(10, "Description must be at least 3 characters"),
  bankTarget: Yup.string()
    .required("BankTarget is required")
    .min(3, "BankTarget must be at least 3 characters")
    .max(20, "BankTarget must be at most 20 characters"),
  paymentTarget: Yup.string()
    .required("PaymentTarget is required")
    .matches(/^\d+$/, "PaymentTarget must contain only numbers")
    .min(1, "PaymentTarget must be at least 1 character"),
  organizerPict: Yup.mixed().nullable(),
});

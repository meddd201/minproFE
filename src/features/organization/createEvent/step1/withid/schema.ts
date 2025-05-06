import { CATEGORY } from "@/types/category";
import { Location } from "@/types/Locations";
import * as Yup from "yup";

export const EditEventStep1validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z0-9 ]*$/, "Name can only contain letters and numbers")
    .max(50, "Name must be at most 50 characters"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  category: Yup.string()
    .oneOf(
      Object.values(CATEGORY),
      "Category must be one of the predefined values",
    )
    .required("Category is required"),
  location: Yup.string()
    .oneOf(
      Object.values(Location),
      "Location must be one of the predefined values",
    )
    .required("Location is required"),
  eventStart: Yup.date().required("Start date is required"),
  eventEnd: Yup.date()
    .min(Yup.ref("eventStart"), "End date must be after start date")
    .required("End date is required"),
});

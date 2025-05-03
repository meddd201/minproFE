"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";

const validationSchema = Yup.object({
  code: Yup.string().min(3, "Code must be at least 3 characters").required("Voucher code is required"),
  discount: Yup.number()
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount cannot exceed 100%")
    .required("Discount is required"),
  expiryDate: Yup.date().required("Expiry date is required"),
});

export default function CreateVoucherPage() {
  const router = useRouter();
  const { eventid } = useParams();

  const initialValues = {
    code: "",
    discount: 10,
    expiryDate: "",
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch(`/vouchers/${eventid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create voucher");
      }

      const result = await response.json();
      alert("Voucher created successfully!");
      console.log(result);

      // Redirect to a confirmation page or dashboard
      router.push(`/organization/create-event/confirmation/${eventid}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the voucher");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-6">Create Vouchers for Event</h1>
      <p className="text-muted-foreground mb-4">Event ID: {eventid}</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className="space-y-6">
          {/* Voucher Code */}
          <div>
            <label className="block font-medium mb-1">Voucher Code</label>
            <Field
              name="code"
              as={Input}
              placeholder="e.g. DISCOUNT10"
              className="w-full"
            />
            <ErrorMessage name="code" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Discount */}
          <div>
            <label className="block font-medium mb-1">Discount (%)</label>
            <Field
              name="discount"
              type="number"
              as={Input}
              placeholder="e.g. 10"
              className="w-full"
            />
            <ErrorMessage name="discount" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block font-medium mb-1">Expiry Date</label>
            <Field
              name="expiryDate"
              type="date"
              as={Input}
              className="w-full"
            />
            <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            Create Voucher
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

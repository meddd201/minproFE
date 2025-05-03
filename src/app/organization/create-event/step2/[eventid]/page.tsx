"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const validationSchema = Yup.object({
  ticketName: Yup.string()
    .min(3, "Ticket name must be at least 3 characters")
    .required("Ticket name is required"),
  price: Yup.number()
    .min(0, "Price must be a positive number")
    .required("Price is required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
});

export default function CreateTicketPage() {
  const router = useRouter();
  const { eventid } = useParams();

  const initialValues = {
    ticketName: "",
    price: 0,
    quantity: 1,
  };

  const onSubmit = async (values: typeof initialValues) => {
    try {
      const response = await fetch(`/tickets/${eventid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to create ticket");
      }

      const result = await response.json();
      alert("Ticket created successfully!");
      console.log(result);

      router.push(`/organization/create-event/step3/${eventid}`);
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the ticket");
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Create Tickets for Event</h1>
        <p className="text-muted-foreground mb-4">Event ID: {eventid}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form className="space-y-6">
              {/* Ticket Name */}
              <div>
                <label className="mb-1 block font-medium">Ticket Name</label>
                <Field
                  name="ticketName"
                  as={Input}
                  placeholder="e.g. VIP Ticket"
                  className="w-full"
                />
                <ErrorMessage
                  name="ticketName"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Ticket Price */}
              <div>
                <label className="mb-1 block font-medium">Price (IDR)</label>
                <Field
                  name="price"
                  type="currency"
                  as={Input}
                  placeholder="e.g. 50000"
                  className="w-full"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Ticket Quantity */}
              <div>
                <label className="mb-1 block font-medium">Quantity</label>
                <Field
                  name="quantity"
                  type="number"
                  as={Input}
                  placeholder="e.g. 100"
                  className="w-full"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Submit Button */}
              <Link href={`/organization/create-event/step3/${eventid}`}>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Create Ticket
                </Button>
              </Link>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}

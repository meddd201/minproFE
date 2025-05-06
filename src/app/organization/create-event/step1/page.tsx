"use client";

import TiptapRichtextEditor from "@/components/TiptapRichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateEvent from "@/hooks/api/events/useCreateEvent";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";

const validationSchema = Yup.object({
  name: Yup.string()
    .min(5, "Name must be at least 5 characters")
    .required("Name is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
  location: Yup.string().required("Location is required"),
  eventStart: Yup.date().required("Start date is required"),
  eventEnd: Yup.date()
    .min(Yup.ref("eventStart"), "End date must be after start date")
    .required("End date is required"),
  eventPict: Yup.mixed().required("Event picture is required"),
});

export default function CreateEventPage() {
  const [eventStart, setEventStart] = useState<String>("");
  const [eventEnd, setEventEnd] = useState<string>("");
  const router = useRouter();

  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      location: "",
      eventStart: "",
      eventEnd: "",
      eventPict: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await createEvent(values); // Panggil API untuk membuat event
      const eventId = result.data.id; // Ambil eventId dari respons backend
      router.push(`/organization/create-event/step2/${eventId}`);

      await createEvent(values);
    },
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Create a New Event</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details to create your event
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label className="mb-1 block font-medium">Event Name</label>
              <Input
                type="text"
                name="name"
                placeholder="e.g. Tech Conference 2024"
                className="w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {!!formik.touched.name && !!formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div>

            {/* Event Description */}
            <div>
              <TiptapRichtextEditor
                content={formik.values.description}
                isTouch={formik.touched.description}
                label="Description"
                field="description"
                onChange={(value: string) =>
                  formik.setFieldValue("description", value)
                }
                setError={formik.setFieldError}
                setTouch={formik.setFieldTouched}
                showError={false}
              />

              {!!formik.touched.description && !!formik.errors.description && (
                <p className="text-sm text-red-500">
                  {formik.errors.description} OI
                </p>
              )}
            </div>

            {/* Event Category */}
            <div>
              <label className="mb-1 block font-medium">Category</label>
              {/* <Select
                type="category"
                name="category"
                className="w-full rounded-md border p-2"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              /> */}

              <Select
                onValueChange={(value) => {
                  formik.setFieldValue("category", value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Concerts">Concerts</SelectItem>
                    <SelectItem value="Festivals">Festivals</SelectItem>
                    <SelectItem value="Theatre">Theatre</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              {!!formik.touched.category && !!formik.errors.category && (
                <p className="text-sm text-red-500">{formik.errors.category}</p>
              )}
            </div>

            {/* Event Location */}
            <div>
              <label className="mb-1 block font-medium">Location</label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Jakarta Convention Center"
                className="w-full"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {!!formik.touched.location && !!formik.errors.location && (
                <p className="text-sm text-red-500">{formik.errors.location}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium">Date</h2>

              {/* Start Date and End Date */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="block font-medium">Start Date</label>
                  <div className="relative">
                    <CalendarIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      type="date"
                      name="eventStart"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={formik.values.eventStart}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {eventStart && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      Selected: {eventStart}
                    </p>
                  )}
                  {/* {errors.eventStart && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.eventStart}
                        </p>
                      )} */}
                </div>

                {/* End Date */}
                <div className="space-y-2">
                  <label className="block font-medium">
                    End Date (Optional)
                  </label>
                  <div className="relative">
                    <CalendarIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Input
                      type="date"
                      name="eventEnd"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={formik.values.eventEnd}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  {eventEnd && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      Selected: {format(eventEnd, "PPP")}
                    </p>
                  )}
                  {/* {errors.eventEnd && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.eventEnd}
                        </p>
                      )} */}
                </div>
              </div>
            </div>

            {/* Event Picture */}
            <div>
              <label className="mb-1 block font-medium">Event Picture</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue(
                    "eventPict",
                    event.currentTarget.files?.[0],
                  );
                }}
                className="w-full rounded-md border p-2"
              />
              {!!formik.touched.eventPict && !!formik.errors.eventPict && (
                <p className="text-sm text-red-500">
                  {formik.errors.eventPict}
                </p>
              )}
            </div>

            {/* Submit Button */}

            <Button
              disabled={isPending || !formik.isValid}
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

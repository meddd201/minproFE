"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useCreateEvent from "@/hooks/api/events/useCreateEvent";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

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
  const [eventStart, setEventStart] = useState<Date | null>(null);
  const [eventEnd, setEventEnd] = useState<Date | null>(null);

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
      console.log(values);

      // await createEvent(values);
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
            {/* <div>
              <label className="mb-1 block font-medium">Event Name</label>
              <Input
                type="text"
                name="name"
                placeholder="e.g. Tech Conference 2024"
                className="w-full"
              />
              {!!formik.touched.name && !!formik.errors.name && (
                <p className="text-sm text-red-500">{formik.errors.name}</p>
              )}
            </div> */}

            {/* Event Description */}
            {/* <div>
              <label className="mb-1 block font-medium">
                Event Description
              </label>
              <Input
                name="description"
                placeholder="Describe your event..."
                className="w-full"
              />
              {!!formik.touched.description && !!formik.errors.description && (
                <p className="text-sm text-red-500">{formik.errors.description}</p>
              )}

            </div> */}

            {/* Event Category */}
            {/* <div>
              <label className="mb-1 block font-medium">Category</label>
              <Input
              type="category"
                name="category"
                className="w-full rounded-md border p-2"
              >
                <option value="" label="Select a category" />
                <option value="sports" label="Sport" />
                <option value="music" label="Music" />
                <option value="festival" label="Festival" />
                <option value="concert" label="Concert" />
              </Input>
              {!!formik.touched.category && !!formik.errors.category && (
                <p className="text-sm text-red-500">{formik.errors.category}</p>
              )}
            </div> */}

            {/* Event Location */}
            {/* <div>
              <label className="mb-1 block font-medium">Location</label>
              <Input
                type="text"
                name="location"
                placeholder="e.g. Jakarta Convention Center"
                className="w-full"
              />
              {!!formik.touched.location && !!formik.errors.location && (
                <p className="text-sm text-red-500">{formik.errors.location}</p>
              )}
            </div> */}

            {/* Start Date */}
            <div className="space-y-4">
              {/* <h2 className="text-lg font-medium">Date</h2> */}

              {/* Start Date and End Date */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* Start Date */}
                <div className="space-y-2">
                  <label className="block font-medium">Start Date</label>
                  <div className="relative">
                    <CalendarIcon className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <input
                      type="date"
                      name="eventStart"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={eventStart ? format(eventStart, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setEventStart(date);
                      }}
                    />
                  </div>
                  {eventStart && (
                    <p className="text-muted-foreground mt-1 text-sm">
                      Selected: {format(eventStart, "PPP")}
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
                    <input
                      type="date"
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border px-3 py-2 pl-10 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      value={eventEnd ? format(eventEnd, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        setEventEnd(date);
                      }}
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
              <input
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue("eventPict", event.currentTarget.files?.[0]);
                }}
                className="w-full rounded-md border p-2"
              />
              {!!formik.touched.eventPict && !!formik.errors.eventPict && (
                <p className="text-sm text-red-500">{formik.errors.eventPict}</p>
              )}
            </div>

            {/* Submit Button */}

            <Link href="/organization/create-event/step2">
              <Button
                disabled={isPending || !formik.isValid}
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                Next
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

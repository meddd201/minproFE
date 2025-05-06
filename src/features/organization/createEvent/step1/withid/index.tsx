"use client";

import Loading from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { cn } from "@/lib/utils";
import { CATEGORY } from "@/types/category";
import { Location } from "@/types/Locations";
import { format } from "date-fns";
import { useFormik } from "formik";
import { CalendarIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC, useRef, useState } from "react";
import { EditEventStep1validationSchema } from "./schema";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import Image from "next/image";
import useCreateEvent from "@/hooks/api/events/useCreateEvent";
const TipTapRichTextEditor = dynamic(
  () => import("@/components/TiptapRichTextEditor"),
  { ssr: false },
);

export interface StepOneIDPageProps {
  eventid: string;
}
const StepOneIDPage: FC<StepOneIDPageProps> = ({ eventid }) => {
  const { mutateAsync: createEvent, isPending } = useCreateEvent();

  const {
    data: dataevent,
    isPending: pendingEvent,
    error: errorEvent,
  } = useGetOrgDetailEvent(eventid);

  const initialValues = {
    id: eventid,
    name: dataevent?.data?.name || "",
    description: dataevent?.data?.description || "",
    category: dataevent?.data?.category || "",
    location: dataevent?.data?.location || "",
    eventStart: dataevent?.data?.eventStart || "",
    eventEnd: dataevent?.data?.eventEnd || "",
    eventPict: null,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: EditEventStep1validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await createEvent(values);
    },
  });

  const backref =
    dataevent?.data?.status === "DRAFT"
      ? `/organization/events`
      : `/organization/events/${eventid}`;

  const [selectedImage, setSelectedImage] = useState<string>("");
  const eventPictref = useRef<HTMLInputElement>(null);
  const onchangeeventPict = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldTouched("eventPict", true);
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds2MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/avif"].includes(file.type)) {
        toast.error("Only JPEG, PNG, or AVIF files are allowed");
        return;
      }

      formik.setFieldValue("eventPict", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage("");
    formik.setFieldValue("eventPict", null);
    if (eventPictref.current) {
      eventPictref.current.value = "";
    }
  };
  if (pendingEvent) {
    return <Loading className="container mx-auto h-[100vh] items-center" />;
  }

  if (errorEvent) {
    redirect("/organization");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Edit Your Event</h1>
        <p className="text-muted-foreground mt-2">
          Fill in the details to edit your event
        </p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Event Picture */}
            <label className="block font-medium">Image</label>
            {(selectedImage || dataevent.data.image) && (
              <div className="flex w-full items-center justify-center">
                <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border-2 border-dashed border-gray-300">
                  <Image
                    src={selectedImage ? selectedImage : dataevent.data.image!}
                    alt="eventPict"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            <div className="flex">
              <Input
                ref={eventPictref}
                id="eventPict"
                name="eventPict"
                type="file"
                accept="image/*"
                onChange={onchangeeventPict}
              />

              {selectedImage && (
                <Button
                  type="button"
                  className="bg-red-500 p-1 text-white"
                  onClick={handleRemoveImage}
                >
                  Remove
                </Button>
              )}
            </div>

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
              <TipTapRichTextEditor
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
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* Event Category */}
            <div>
              <label className="mb-1 block font-medium">Category</label>
              <Select
                value={formik.values.category}
                onValueChange={(value) => {
                  value ? formik.setFieldValue("category", value) : null;
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    {CATEGORY.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
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
              <Select
                value={formik.values.location}
                onValueChange={(value) => {
                  value ? formik.setFieldValue("location", value) : null;
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {Object.values(Location).map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              {!!formik.touched.location && !!formik.errors.location && (
                <p className="text-sm text-red-500">{formik.errors.location}</p>
              )}
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="grow space-y-2">
                <label className="block font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.eventStart && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {formik.values.eventStart ? (
                        format(formik.values.eventStart, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.eventStart
                          ? new Date(formik.values.eventStart)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("eventStart", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.errors.eventStart && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.eventStart}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div className="grow space-y-2">
                <label className="block font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.eventEnd && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {formik.values.eventEnd ? (
                        format(formik.values.eventEnd, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.eventEnd
                          ? new Date(formik.values.eventEnd)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("eventEnd", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.errors.eventEnd && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.eventEnd}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between">
              <Link href={backref}>
                <Button type="button">Back</Button>
              </Link>

              <Button
                disabled={pendingEvent || !formik.isValid || isPending}
                type="submit"
              >
                Save and Next
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepOneIDPage;

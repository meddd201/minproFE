"use client";

import TipTapRichTextEditor from "@/components/TiptapRichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useRegisterOrgaizer from "@/hooks/api/auth/useRegisterOrgaizer";
import useValidateOrganizerName from "@/hooks/api/validate/useValidateOrganizerName";
import { useFormik } from "formik";
import { CircleCheck, CircleX } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import { RegisterOrganizerSchema } from "../schema";

const RegisterOrganizerForm = () => {
  const { mutateAsync: RegisterOrg, isPending } = useRegisterOrgaizer();

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      bankTarget: "",
      paymentTarget: "",
      organizerPict: null,
    },
    validationSchema: RegisterOrganizerSchema,
    onSubmit: async (values) => {
      await RegisterOrg(values);
    },
  });

  const { valid, validateName } = useValidateOrganizerName();
  const [debouncName] = useDebounce(formik.values.name, 500);
  useEffect(() => {
    if (debouncName) {
      validateName(debouncName);
    }
  }, [debouncName]);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const organizerPictref = useRef<HTMLInputElement>(null);
  const onchangeOrganizerPict = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      formik.setFieldTouched("organizerPict", true);
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds2MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/avif"].includes(file.type)) {
        toast.error("Only JPEG, PNG, or AVIF files are allowed");
        return;
      }

      formik.setFieldValue("organizerPict", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };
  const handleRemoveImage = () => {
    setSelectedImage("");
    formik.setFieldValue("organizerPict", null);
    if (organizerPictref.current) {
      organizerPictref.current.value = "";
    }
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="mx-auto mb-5 space-y-4 rounded-2xl border p-4 shadow-md md:w-[80%]"
    >
      <div className="grid gap-2">
        <Label htmlFor="organizerPict">Organizer Picture</Label>
        {selectedImage && (
          <div className="flex w-full items-center justify-center">
            <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border-2 border-dashed border-gray-300">
              <Image
                src={selectedImage}
                alt="organizerPict"
                fill
                className="object-cover"
              />
            </div>
          </div>
        )}
        <div className="flex">
          <Input
            ref={organizerPictref}
            id="organizerPict"
            name="organizerPict"
            type="file"
            accept="image/*"
            onChange={onchangeOrganizerPict}
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
        {!!formik.touched.organizerPict && !!formik.errors.organizerPict && (
          <p className="text-sm text-red-500">{formik.errors.organizerPict}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="name">Organizer Name</Label>
        <div className="flex">
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="example: PT Maju Organizer Sejahtera"
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {valid === "true" ? (
            <CircleCheck
              size={32}
              className="aspect-square h-full text-green-500"
            />
          ) : valid === "false" ? (
            <CircleX size={32} className="aspect-square h-full text-red-500" />
          ) : null}
        </div>
        {!!formik.touched.name && !!formik.errors.name && (
          <p className="text-sm text-red-500">{formik.errors.name}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="bankTarget">Bank Target</Label>
        <Input
          id="bankTarget"
          name="bankTarget"
          type="text"
          placeholder="example: BCA, BRI, BNI"
          required
          value={formik.values.bankTarget}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.bankTarget && !!formik.errors.bankTarget && (
          <p className="text-sm text-red-500">{formik.errors.bankTarget}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="paymentTarget">Account Number </Label>
        <Input
          id="paymentTarget"
          name="paymentTarget"
          type="text"
          placeholder="example: 1234567890"
          required
          value={formik.values.paymentTarget}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {!!formik.touched.paymentTarget && !!formik.errors.paymentTarget && (
          <p className="text-sm text-red-500">{formik.errors.paymentTarget}</p>
        )}
      </div>

      <TipTapRichTextEditor
        content={formik.values.description}
        isTouch={formik.touched.description}
        label="Description"
        field="description"
        onChange={(value: string) => formik.setFieldValue("description", value)}
        setError={formik.setFieldError}
        setTouch={formik.setFieldTouched}
        showError={false}
      />

      {!!formik.touched.description && !!formik.errors.description && (
        <p className="text-sm text-red-500">{formik.errors.description} OI</p>
      )}
      <Button
        disabled={isPending || valid !== "true" || !formik.isValid}
        type="submit"
        className="w-full hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
      >
        {isPending ? "loading..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterOrganizerForm;

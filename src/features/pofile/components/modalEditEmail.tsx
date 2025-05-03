"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateEmail from "@/hooks/api/profile/useUpdateEmail";
import useValidateEmail from "@/hooks/api/profile/useValidateEmail";
import { useFormik } from "formik";
import { CircleCheck, CircleX } from "lucide-react";
import { useEffect } from "react";
import { useDebounce } from "use-debounce";
import * as Yup from "yup";

const ModalEditEmail = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("email is required")
        .email("email must be a valid email"),
    }),
    onSubmit: async (values) => {
      updateEmail(values.email);
      onClose();
    },
  });

  const { mutateAsync: updateEmail, isPending } = useUpdateEmail();
  const { valid, setValid, validateEmail } = useValidateEmail();
  const [debounceEmail] = useDebounce(formik.values.email, 500);

  const handlecancel = () => {
    formik.resetForm();
    setValid("empty");
    onClose();
  };

  useEffect(() => {
    if (debounceEmail && formik.errors.email === undefined) {
      validateEmail(debounceEmail);
    }
  }, [debounceEmail]);

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-80 rounded-lg bg-white p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Edit Email</h2>
        {valid === "true" ? (
          <CircleCheck
            size={50}
            className="aspect-square h-full mx-auto text-green-500"
          />
        ) : (valid === "false" || !!formik.errors.email) ? (
          <CircleX size={50} className="aspect-square h-full mx-auto text-red-500" />
        ) : null}
        <form onSubmit={formik.handleSubmit}>
          <div className="relative my-2 grid gap-2">
            <Input
              name="email"
              id="email"
              type="text"
              placeholder="Your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.email && !!formik.errors.email && (
              <span className="text-destructive text-sm">
                {formik.errors.email}
              </span>
            )}
          </div>
          <div className="flex justify-between gap-3">
            <Button
              disabled={isPending}
              onClick={handlecancel}
              type="button"
              className="grow bg-[#9cdcfe] text-black hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={
                formik.errors.email !== undefined ||
                isPending ||
                valid !== "true"
              }
              type="submit"
              className="grow hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditEmail;

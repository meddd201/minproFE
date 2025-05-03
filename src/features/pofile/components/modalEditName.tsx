"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUpdateUsername from "@/hooks/api/profile/useUpdateUsername";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalEditName = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { mutateAsync: updateName, isPending } = useUpdateUsername();
  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters long")
        .max(20, "Username must be at most 20 characters long")
        .required("Username is required"),
    }),
    onSubmit: async (values) => {
      updateName(values.username);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-80 rounded-lg bg-white p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Edit Name</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative my-2 grid gap-2">
            <Input
              name="username"
              id="username"
              type="text"
              placeholder="Your username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {!!formik.touched.username && !!formik.errors.username && (
              <span className="text-destructive text-sm">
                {formik.errors.username}
              </span>
            )}
          </div>
          <div className="flex justify-between gap-3">
            <Button
              disabled={isPending}
              onClick={onClose}
              type="button"
              className="grow bg-[#9cdcfe] text-black hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
            >
              Cancel
            </Button>
            <Button
              disabled={formik.errors.username !== undefined || isPending}
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

export default ModalEditName;

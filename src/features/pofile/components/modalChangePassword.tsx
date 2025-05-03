"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useChangePassword from "@/hooks/api/auth/useChangePassword";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

const ModalChangePassword = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object().shape({
      oldPassword: Yup.string().required("Password is required"),
      newPassword: Yup.string()
        .min(8)
        .minUppercase(1)
        .minNumbers(1)
        .minLowercase(1)
        .minSymbols(0)
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      updatePass(values);
      onClose();
    },
  });
  const { mutateAsync: updatePass, isPending } = useChangePassword();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-80 rounded-lg bg-white p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Change Password</h2>
        <form className="space-y-2" onSubmit={formik.handleSubmit}>
          <div className="relative grid gap-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <div className="relative">
              <Input
                name="oldPassword"
                id="oldPassword"
                type={showOldPassword ? "text" : "password"}
                placeholder="********"
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
              >
                {showOldPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {!!formik.touched.oldPassword && !!formik.errors.oldPassword && (
              <span className="text-destructive w-full text-left text-sm md:top-full">
                {formik.errors.oldPassword}
              </span>
            )}
          </div>

          <div className="relative grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                name="newPassword"
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="********"
                value={formik.values.newPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
              >
                {showNewPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            {!!formik.touched.newPassword && !!formik.errors.newPassword && (
              <span className="text-destructive w-full text-left text-sm md:top-full">
                {formik.errors.newPassword}
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
              disabled={
                formik.errors.newPassword !== undefined ||
                isPending ||
                formik.errors.oldPassword !== undefined
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

export default ModalChangePassword;

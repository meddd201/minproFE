"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEB_NAME } from "@/config/env";
import useResetPassword from "@/hooks/api/auth/useResetPassword";
import { useFormik } from "formik";
import { ResetPasswordValidationSchema } from "./schema";
import { FC, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface ResetPasswordPageProps {
  token: string;
}
const ResetPasswordForm: FC<ResetPasswordPageProps> = ({ token }) => {
  const { mutateAsync: resetPassword, isPending } = useResetPassword(token);
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: ResetPasswordValidationSchema,
    onSubmit: async (values) => {
      await resetPassword({ newPassword: values.password, token: token });
    },
  });

  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden py-0 shadow-2xl">
        <CardContent className="grid">
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-muted-foreground text-balance">
                  Reset your {`${WEB_NAME}`} account password
                </p>
              </div>

              <div className="relative grid gap-0">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    name="password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!!formik.touched.password && !!formik.errors.password && (
                  <span className="text-destructive text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    name="confirmPassword"
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="********"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {!!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword && (
                    <span className="text-destructive top-full text-sm">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>

              <div className="flex flex-col gap-1">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
                >
                  {isPending ? "loading..." : "Reset Password"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;

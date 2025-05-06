"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEB_NAME } from "@/config/env";
import useRegister from "@/hooks/api/auth/useRegister";
import useValidateRefferal from "@/hooks/api/validate/useValidateReferal";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { CircleCheck, CircleX, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { RegisterValidationSchema } from "./schema";

export default function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setValid, valid, validateRefferal } = useValidateRefferal();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
    validationSchema: RegisterValidationSchema,
    onSubmit: async (values) => {
      await register(values);
    },
  });

  const validateReferralCode = () => {
    validateRefferal(formik.values.referralCode);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0 shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p className="text-muted-foreground text-balance">
                  Register for your {`${WEB_NAME}`} account
                </p>
              </div>

              <div className="relative grid gap-2">
                <Label htmlFor="username">Username</Label>
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
                  <span className="text-destructive absolute top-full text-sm">
                    {formik.errors.username}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {!!formik.touched.email && !!formik.errors.email && (
                  <span className="text-destructive absolute top-full text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              <div className="relative grid gap-2">
                <Label htmlFor="password">Password</Label>
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
                  <Button
                    variant={"ghost"}
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {!!formik.touched.password && !!formik.errors.password && (
                  <span className="text-destructive text-sm md:absolute md:top-full">
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
                  <Button
                  variant={"ghost"}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {!!formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword && (
                    <span className="text-destructive text-sm md:absolute md:top-full">
                      {formik.errors.confirmPassword}
                    </span>
                  )}
              </div>

              <div className="relative grid gap-2">
                <Label htmlFor="referralCode">Referral Code</Label>
                <div className="flex gap-2">
                  {valid === "true" ? (
                    <CircleCheck
                      size={32}
                      className="aspect-square h-full text-green-500"
                    />
                  ) : valid === "false" ? (
                    <CircleX
                      size={32}
                      className="aspect-square h-full text-red-500"
                    />
                  ) : null}
                  <Input
                    name="referralCode"
                    id="referralCode"
                    type="text"
                    placeholder="Referral code"
                    value={formik.values.referralCode}
                    onChange={(e) => {
                      formik.handleChange(e);
                      setValid("false");
                    }}
                    onBlur={formik.handleBlur}
                  />
                  <Button
                    type="button"
                    onClick={validateReferralCode}
                    className="shrink-0 hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
                  >
                    Validate
                  </Button>
                </div>
                {!!formik.touched.referralCode &&
                  !!formik.errors.referralCode && (
                    <span className="text-destructive absolute top-full text-sm">
                      {formik.errors.referralCode}
                    </span>
                  )}
              </div>
              <div className="flex flex-col gap-1">
                <Button
                  disabled={isPending || valid === "false" || !formik.dirty}
                  type="submit"
                  className="w-full hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
                >
                  {isPending ? "loading..." : "Register"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/register/image.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

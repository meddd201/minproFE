"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WEB_NAME } from "@/config/env";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { ForgotPasswordValidationSchema } from "./schema";
import Link from "next/link";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";

export default function ForgotPassForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync: sendEmail, isPending } = useForgotPassword();
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordValidationSchema,
    onSubmit: async (values) => {
      await sendEmail(values.email);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0 shadow-2xl">
        <CardContent className="grid p-0">
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Forgot Password</h1>
                <p className="text-muted-foreground text-balance">
                  Enter your email to reset your {`${WEB_NAME}`} account
                  password
                </p>
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

              <div className="flex flex-col gap-1">
                <Button
                  disabled={isPending || !formik.dirty}
                  type="submit"
                  className="w-full hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
                >
                  {isPending ? "Sending..." : "Send Email"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="underline-offset-4 hover:underline"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

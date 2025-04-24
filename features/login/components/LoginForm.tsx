"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/hooks/api/auth/useLogin";
import { cn } from "@/lib/utils";
import { useFormik } from "formik";
import { LoginValidationSchema } from "./schema";
import { WEB_NAME } from "@/config/env";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { mutateAsync: login, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden py-0 shadow-2xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src="/cuteshine19_01.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={formik.handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your { `${WEB_NAME}`} account
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

              <div className="relative grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="password"
                  type="password"
                />
                {!!formik.touched.password && !!formik.errors.password && (
                  <span className="text-destructive absolute top-full text-sm">
                    {formik.errors.password}
                  </span>
                )}
              </div>

              <Button disabled={isPending } type="submit" className="w-full">
                {isPending ? "loading..." : "Submit"}
              </Button>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/register" className="underline underline-offset-4">
                  Register
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

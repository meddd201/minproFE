import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RegisterOrganizerPage from "@/features/register-organizer";

const RegisterOrganizer = async () => {
  const session = await auth();
  if (session?.user.role !== "USER") {
    return redirect("/");
  }
  return <RegisterOrganizerPage />;
};

export default RegisterOrganizer;

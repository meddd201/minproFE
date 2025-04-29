import React from "react";
import RegisterOrganizerPage from "../features/register-organizer";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const RegisterOrganizer = async () => {
  const session = await auth();
  if (session?.user.role !== "USER") {
    return redirect("/");
  }
  return <RegisterOrganizerPage />;
};

export default RegisterOrganizer;

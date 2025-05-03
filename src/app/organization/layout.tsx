import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Navigator } from "./components/navigator";

export default async function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ADMIN") return redirect("/");
  return (
    <main>
      <Navigator />
      {children}
    </main>
  );
}

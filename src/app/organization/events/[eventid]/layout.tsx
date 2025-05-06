import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import EventDetailNavigator from "./components/EventDetailNavigator";

export default async function OrganizerEventLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventid: string }>;
}) {
  const session = await auth();
  if (!session) return redirect("/");
  if (session.user.role !== "ADMIN") return redirect("/");
  const eventid = (await params).eventid;
  return (
    <main>
      <EventDetailNavigator eventId={eventid} />
      {children}
    </main>
  );
}

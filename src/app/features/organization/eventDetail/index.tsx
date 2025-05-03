"use client";
import Loading from "@/components/loading/loading";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { redirect } from "next/navigation";
import { FC } from "react";
import TitleHead from "./components/TitleHead";
import EventDetailBody from "./components/EventDetailBody";

interface OrganizerEventDetailPageProps {
  eventId: string;
}

const OrganizerEventDetailPage: FC<OrganizerEventDetailPageProps> = ({
  eventId,
}) => {
  const { data: _eventData, isPending, error } = useGetOrgDetailEvent(eventId);
  if (isPending) {
    return <Loading className="h-screen" />;
  }
  if (error) {
    redirect("/organization/events");
  }
  return (
    <main>
      <TitleHead eventId={eventId} />
      <EventDetailBody eventId={eventId} />
    </main>
  );
};

export default OrganizerEventDetailPage;

"use client";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface TitleHeadProps {
  eventId: string;
}

const TitleHead: React.FC<TitleHeadProps> = ({ eventId }) => {
  const { data: eventData, isPending } = useGetOrgDetailEvent(eventId);

  return (
    <section className="container mx-auto">
      <div className="flex-rows mx-2 flex items-center rounded-md border bg-white text-center shadow-md md:px-10">
        <Link href={"/organization/events"}>
          <ArrowLeftCircle size={50} className="rounded-full shadow-lg" />
        </Link>
        <div className="mx-2 h-full grow items-center">
          <h1 className="text-3xl font-bold">Event Detail Page</h1>
          <h2 className="text-2xl">{eventData?.data.name}</h2>
        </div>
      </div>
    </section>
  );
};

export default TitleHead;

"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface TitleHeadProps {
  eventId: string;
}

const EventDetailNavigator: React.FC<TitleHeadProps> = ({ eventId }) => {
  const { data: eventData, isPending, error } = useGetOrgDetailEvent(eventId);
  const pathname = usePathname();
  let currentPath = pathname.split("/").pop() || "preview";
  const includePath = ["attendees", "transactions", "preview"];
  if (!includePath.includes(currentPath)) {
    currentPath = "preview";
  }
  useEffect(() => {
    if (currentPath === "preview") {
      document.title = `Event Preview`;
    } else if (currentPath === "attendees") {
      document.title = `Event Attendees`;
    } else if (currentPath === "transactions") {
      document.title = `Event Transactions`;
    }
  }, [currentPath]);
  if (eventData?.data.status === "DRAFT" || error) {
    redirect("/organization/events");
  }
  return (
    <section className="container mx-auto">
      <div className="flex-rows mx-2 flex items-center text-center md:px-10">
        <Link href={"/organization/events"}>
          <ArrowLeftCircle size={50} className="rounded-full shadow-lg" />
        </Link>
        <div className="mx-2 h-full grow items-center rounded-md border bg-white shadow-md">
          <h1 className="text-3xl font-bold">Event Detail Page</h1>
          <h2 className="text-2xl">{eventData?.data.name}</h2>
        </div>
      </div>
      <Tabs
        defaultValue={currentPath}
        className="container mx-auto w-full p-6"
        orientation="horizontal"
      >
        <TabsList className="mx-auto flex gap-4">
          <Link className="grow" href={`/organization/events/${eventId}`}>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </Link>
          <Link
            className="grow"
            href={`/organization/events/${eventId}/attendees`}
          >
            <TabsTrigger value="attendees">Atendee List</TabsTrigger>
          </Link>
          <Link href={`/organization/events/${eventId}/transactions`}>
            <TabsTrigger value="transactions">Transaction</TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </section>
  );
};

export default EventDetailNavigator;

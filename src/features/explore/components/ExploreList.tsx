"use client";

import React from "react";
import ExploreCard from "./ExploreCard";
import useGetEvents from "@/hooks/api/events/useGetEvents";
import { IEvent } from "@/types/events";
import Loading from "@/components/loading/loading";

interface ExploreListProps {
  event: IEvent[]
}
const ExploreList = () => {
  const { data: events, isPending } = useGetEvents();

  return (
    <>
      {isPending && (
        <div className="h-[30vh flex items-center justify-center">
          <Loading className="" />
        </div>
      )}

      {!!events && !!events.data.length && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {events.data.map((event) => (
            <ExploreCard key={event.id} event={event} />
          ))}
        </section>
      )}
    </>
  );
};

export default ExploreList;

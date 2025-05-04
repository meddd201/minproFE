import { format } from "date-fns";

import { Event } from "@/types/events";
import { TransactionTicket } from "@/types/transactionTicket";
import { Calendar, Calendar1, CalendarArrowDown, MapPin } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import { formatLocation } from "@/utils/formatinLocation";

interface DetailTransEventProps {
  transactionTickets: TransactionTicket[];
}
const DetailTransEvent: FC<DetailTransEventProps> = ({
  transactionTickets,
}) => {
  // checking if transactionTickets is empty
  if (transactionTickets.length === 0) {
    return <div>No Event</div>;
  }
  const eventData: Event[] = [];
  transactionTickets.forEach((transTicket) => {
    if (
      !eventData.find((event) => event.id === transTicket.tickets!.events!.id)
    ) {
      eventData.push(transTicket.tickets!.events!);
    }
  });
  return (
    eventData.length > 0 &&
    eventData.map((event) => (
      <div
        key={event.name}
        className="flex flex-col items-start gap-4 sm:flex-row"
      >
        <div className="relative h-[120px] w-[240px] shrink-0 overflow-hidden rounded-md">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold">{event.name}</h3>
          <div className="flex items-center gap-2 text-sm">
            <Calendar1 className="text-muted-foreground h-4 w-4" />
            <span>{format(event.eventStart, "MMMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CalendarArrowDown className="text-muted-foreground h-4 w-4" />
            <span>{format(event.eventEnd, "MMMM dd, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span>{formatLocation(event.location)}</span>
          </div>
        </div>
      </div>
    ))
  );
};

export default DetailTransEvent;

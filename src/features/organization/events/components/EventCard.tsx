"use client";

import CardMarkdown from "@/components/CardMarkdown";
import Markdown from "@/components/Markdown";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types/events";
import { Label } from "@radix-ui/react-dropdown-menu";
import { format } from "date-fns";
import { CalendarArrowDown, CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

// Interface for event properties passed from backend
interface EventCardProps {
  event: Event;
}

const OrganizerEventCard: FC<EventCardProps> = ({ event }) => {
  const formattedEventStart = format(new Date(event.eventStart), "PPP");
  const formattedEventEnd = format(new Date(event.eventEnd), "PPP");
  let refto = `/organization/events/${event.id}`;
  let colorStatus = "bg-green-600/50";
  let colorCategory = "text-muted-foreground bg-amber-400/50";
  if (event.category === "Sports") {
    colorCategory = "text-white bg-red-500/80";
  } else if (event.category === "Festivals") {
    colorCategory = "text-white bg-blue-500/80";
  } else if (event.category === "Concerts") {
    colorCategory = "text-white bg-purple-500/80";
  } else if (event.category === "Theater") {
    colorCategory = "text-white bg-orange-500/80";
  }

  if (event.status === "DRAFT") {
    colorStatus = "bg-slate-500/50 ";
    refto = `/organization/create-event/step1/${event.id}`;
    if (event._count!.tickets > 0) {
      refto = `/organization/create-event/step2/${event.id}`;
    }
    if (event._count!.eventVoucher > 0) {
      refto = `/organization/create-event/step3/${event.id}`;
    }
  }

  return (
    <Link href={refto}>
      <div className="relative flex h-full gap-0 overflow-hidden rounded-2xl border shadow-md transition-all hover:shadow-lg sm:flex-col">
        <div className="relative min-w-1/3 sm:aspect-[2/1] md:h-1/2">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            sizes="100%"
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute top-2 right-2">
          <Badge className={`${colorStatus} text-md`}>{event.status}</Badge>
        </div>
        <div className="mx-2 mb-4 h-fit">
          <h3 className="text-md line-clamp-1 font-bold">{event.name}</h3>
          <Label className={`text-sm ${colorCategory} w-fit rounded-md px-1`}>
            {event.category
              .replace(/_/g, " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </Label>
          <div className="text-muted-foreground mb-2 line-clamp-1 text-sm">
            <CardMarkdown content={event.description} />
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <CalendarDays size={16} className="m-1" />
            <span>{formattedEventStart}</span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <CalendarArrowDown size={16} className="m-1" />
            <span>{formattedEventEnd}</span>
          </div>
          <div className="text-muted-foreground flex items-center text-sm">
            <MapPin size={16} className="m-1" />
            <span className="">
              {event.location
                .replace(/_/g, " ")
                .toLowerCase()
                .replace(/\b\w/g, (char) => char.toUpperCase())}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrganizerEventCard;

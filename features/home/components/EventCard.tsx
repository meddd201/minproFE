"use client";

import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { IEvent } from "@/types/events";
import { format } from "date-fns";


// Interface for event properties passed from backend
interface EventCardProps {
event: IEvent
}

const EventCard: FC<EventCardProps> = ({ event }) => {
  const { name, description, image, category, isFree, eventStart, eventEnd, location, rating, price, slug } = event;
  const formattedEventStart = format(new Date(eventStart), "PPP");
  const formattedEventEnd = format(new Date(eventEnd), "PPP");


  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <div className="relative h-[200px] w-full overflow-hidden rounded-lg">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 left-2">
            <Badge className="bg-purple-600 hover:bg-purple-700">{category}</Badge>
          </div>
          {isFree && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="bg-white">
                Free
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-bold line-clamp-1 ">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{description}</p>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <CalendarDays className="h-4 w-4 mr-1" />
          <span>{formattedEventStart} - {formattedEventEnd}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>{formattedEventStart}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="truncate">{location}</span>
        </div>
      </CardContent>
      <Link href={`/events/${slug}`} className="absolute inset-0">
        <span className="sr-only">View {name}</span>
      </Link>
    </Card>
  );
};

export default EventCard;

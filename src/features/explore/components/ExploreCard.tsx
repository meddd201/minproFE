import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IEvent } from "@/types/events";
import { format } from "date-fns";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface EventCardProps {
  event: IEvent;
}

const ExploreCard: FC<EventCardProps> = ({ event }) => {
  const formattedEventStart = format(new Date(event.eventStart), "PPP");
  const formattedEventEnd = format(new Date(event.eventEnd), "PPP");

  return (
    <Card className="group relative overflow-hidden rounded-2xl shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md">
      <CardHeader>
        <div className="relative h-[150px] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 z-10">
            <Badge className="bg-purple-600 hover:bg-purple-700">
              {event.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 p-4">
        <h3 className="line-clamp-1 text-lg font-semibold">{event.name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {event.description}
        </p>

        <div className="text-muted-foreground flex items-center text-sm">
          <CalendarDays className="mr-1 h-4 w-4" />
          <span>
            {formattedEventStart} - {formattedEventEnd}
          </span>
        </div>
        <div className="text-muted-foreground flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          <span>{formattedEventStart}</span>
        </div>
        <div className="text-muted-foreground flex items-center text-sm">
          <MapPin className="mr-1 h-4 w-4" />
          <span className="truncate">{event.location}</span>
        </div>
      </CardContent>

      <Link href={`/explore/${event.slug}`} className="absolute inset-0 z-0">
        <span className="sr-only">View {event.name}</span>
      </Link>
    </Card>
  );
};

export default ExploreCard;

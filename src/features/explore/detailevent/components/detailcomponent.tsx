import { Badge } from "@/components/ui/badge";
import { IEvent } from "@/types/events";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { getDetailPageEvent } from "../api/getDetailEventTicket";
import { format } from "date-fns";

interface DetailComponentProps {
  slug: string;
}
const DetailComponent: FC<DetailComponentProps> = async ({ slug }) => {
  
  const data = await getDetailPageEvent(slug);
  const fetchedEvent = data.data;
  
  return (
    <section className="min-h-screen bg-gradient-to-b from-indigo-100 to-yellow-100">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back to Events link */}
        <div className="mb-4">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-lg bg-white px-4 py-2 text-indigo-600 shadow-sm transition-all duration-200 hover:text-indigo-700 hover:shadow-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Explore Page
          </Link>
        </div>

        {/* Main */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          {/* Event Image */}
          <div className="relative h-full w-full">
            <Image
              src={fetchedEvent.image || "/notfan.png"}
              alt={fetchedEvent.name || "Event Image"}
              width={800}
              height={500}
              className="w-full"
              priority
            />

            {/* Event Category*/}
            <div className="absolute top-4 left-4">
              <Badge className="bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                {fetchedEvent.category}
              </Badge>
            </div>
          </div>

          {/* Event Details */}
          <div className="p-8">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {fetchedEvent.name}
            </h1>
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-3 h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium">Event Date</p>
                  <p>
                    {fetchedEvent.eventStart
                      ? format(
                          new Date(fetchedEvent.eventStart),
                          "EEEE, dd MMMM yyyy",
                        )
                      : "Date not available"}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="mr-3 h-5 w-5 text-indigo-600" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>{fetchedEvent.location || "Location not available"}</p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">About This Event</h2>
              <p className="leading-relaxed text-gray-600">
                {fetchedEvent.description || "No description available"}
              </p>
            </div>

            {/* Organizer Details */}
            <div className="flex items-center rounded-lg bg-gray-50 p-4">
              <div className="flex-shrink-0">
                <Image
                  src={
                    fetchedEvent.organizers?.organizerPicture ||
                    "/placeholder.svg"
                  }
                  alt="Organizer Logo"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">
                  Organized by{" "}
                  {fetchedEvent.organizers?.name || "Unknown Organizer"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailComponent;

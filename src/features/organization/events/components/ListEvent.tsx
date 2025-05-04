import { Event } from "@/types/events";
import { PageableResponse } from "@/types/pagination";
import { Fan } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import OrganizerEventCard from "./EventCard";
import Loading from "@/components/loading/loading";
import ErrorComponent from "@/components/errorComponent";
import { PaginationComponent } from "@/components/pagination";

interface ListEventProps {
  events: PageableResponse<Event> | undefined;
  loading: boolean;
  error: string | undefined;
  setpage: (page: number) => void;
}

const ListEvent: FC<ListEventProps> = ({ events, loading, error, setpage }) => {
  if (loading) {
    return <Loading className="container mx-auto min-h-[70vh]" />;
  }
  if (error || !events) {
    return (
      <ErrorComponent
        message={error}
        className="container mx-auto flex min-h-[50vh] py-10"
      />
    );
  }
  if (events.data.length === 0) {
    return (
      <section className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center py-10 text-center">
        <Image
          src="/notfan.png"
          alt="Error"
          width={100}
          height={100}
          className="mx-auto aspect-square w-1/2 text-gray-500 md:w-1/4"
        />
        <h2 className="text-center text-lg font-semibold text-gray-700">
          You don't have It, Create Some !
        </h2>
      </section>
    );
  }
  return (
    <section className="container mx-auto my-10 min-h-[60vh] p-4">
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:px-20 lg:grid-cols-4">
        {events.data?.map((event) => (
          <OrganizerEventCard key={event.id} event={event} />
        ))}
      </div>
      <PaginationComponent
        totalPages={events.meta.total / events.meta.take}
        currentPage={events.meta.page}
        setPage={setpage}
      />
    </section>
  );
};

export default ListEvent;

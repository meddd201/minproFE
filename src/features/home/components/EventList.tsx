// "use client";

// import { Input } from "@/components/ui/input";
// import { useQueryState } from "nuqs";
// import EventCard from "./EventCard";
// import useGetEvents from "@/hooks/api/events/useGetEvents";

// const EventList = () => {
//   const [search, setSearch] = useQueryState("search", { defaultValue: "" });

//   const { data, isLoading, isError, error } = useGetEvents();

//   if (isLoading) {
//     return (
//       <div className="flex h-[30vh] items-center justify-center">
//         <h2>Loading...</h2>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex h-[30vh] items-center justify-center">
//         <h2>
//           Error: {error instanceof Error ? error.message : "Unknown error"}
//         </h2>
//       </div>
//     );
//   }

//   const events = data?.events || [];

//   return (
//     <>
//       <Input
//         className="mx-auto mt-10 max-w-xl"
//         placeholder="Search events...."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* Check if there are events to display */}
//       {events.length > 0 ? (
//         <div className="mt-10 grid grid-cols-1 gap-8 space-y-8 md:grid-cols-2 lg:grid-cols-3">
//           {events.map((event) => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       ) : (
//         <div className="flex h-[30vh] items-center justify-center">
//           <h2>No events found</h2>
//         </div>
//       )}
//     </>
//   );
// };

// export default EventList;

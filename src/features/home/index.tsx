"use client";

import useGetCategory from "@/hooks/api/events/useGetCategory";
import useGetEvents from "@/hooks/api/events/useGetEvents";
import useGetUserLocEvents from "@/hooks/api/events/useGetUserLocEvents";
import { parseAsInteger, parseAsIsoDate, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import HomeForm from "./components/HomeForm";

const HomePage = () => {
  // Query state management
  const [searchParams, setSearchParams] = useQueryState("search", {
    defaultValue: "",
  });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [location, setLocation] = useQueryState("locations", {
    defaultValue: "",
  });
  const [date, setDate] = useQueryState("date", parseAsIsoDate);
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  // Data fetching hooks
  const { data: categoryData, isPending: loadingCategories } = useGetCategory();
  const { data: locationData, isPending: loadingLocations } =
    useGetUserLocEvents();

  // Search debouncing
  const [debouncedSearch] = useDebounce(searchParams, 500);

  // Events data fetching
  const {
    data: eventData,
    isPending: loadingEvents,
    error: eventError,
  } = useGetEvents({
    search: debouncedSearch,
    category,
    location,
    date,
    page,
  });

  return (
    <main className="min-h-screen">
      <HomeForm
        events={eventData?.data}
        loading={loadingEvents}
        error={eventError?.message}
        setpage={setPage}
      />
    </main>
  );
};

export default HomePage;

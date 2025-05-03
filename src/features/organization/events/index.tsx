"use client";
import useGetCategory from "@/hooks/api/events/useGetCategory";
import useGetOrganizerEvent from "@/hooks/api/events/useGetOrganizerEvent";
import useGetOrgLocEvents from "@/hooks/api/events/useGetOrgLocEvents";
import { parseAsInteger, parseAsIsoDate, useQueryState } from "nuqs";
import { useDebounce } from "use-debounce";
import ListEvent from "./components/ListEvent";
import SearchBar from "./components/SearchBar";

const OrganizerEventPage = () => {
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

  const { data: categoryData, isPending: loadingCategories } = useGetCategory();

  const { data: locationData, isPending: loadingLocations } =
    useGetOrgLocEvents();

  const [debounchedSearch] = useDebounce(searchParams, 500);
  const {
    data: eventOrganizers,
    isPending,
    error: dataError,
  } = useGetOrganizerEvent({
    page,
    take: 6,
    search: debounchedSearch,
    category: category,
    location: location,
    date: date ? new Date(date) : undefined,
  });

  return (
    <main>
      <div className="relative container mx-auto mb-12 flex w-full items-center justify-center bg-gradient-to-r from-purple-600 to-yellow-400">
        <SearchBar
          className="relative top-10 z-10 mx-auto -mt-10 w-full shadow-md md:max-w-4/5 md:py-4"
          searchParams={searchParams}
          onSearch={(search) => setSearchParams(search)}
          categoryParams={category}
          loadingCategories={loadingCategories}
          onCategoryChange={(category) => setCategory(category)}
          locationParams={location}
          loadingLocations={loadingLocations}
          onLocationChange={(location) => setLocation(location)}
          dateParams={date}
          onDateChange={(e) => setDate(e)}
          locationData={locationData?.data}
          categoryData={categoryData?.data}
        />
      </div>
      <ListEvent
        events={eventOrganizers}
        loading={isPending}
        error={dataError?.message}
        setpage={setPage}
      />
    </main>
  );
};

export default OrganizerEventPage;

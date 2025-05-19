"use client"

import { useDebounce } from "@/hooks/api/events/useDebounce";
import useGetCategory from "@/hooks/api/events/useGetCategory";
import useGetEvents from "@/hooks/api/events/useGetEvents";
import { parseAsInteger, parseAsIsoDate, useQueryState } from "nuqs";
import React from "react";
import ExploreList from "./components/ExploreList";
import SearchBarExplore from "./components/SearchBarExplore";
import Loading from "@/components/loading/loading";

const ExploreForm = () => {
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

  // Fetch categories
  const { data: categoryData, isPending: loadingCategories } = useGetCategory();

  // Fetch locations
  const { data: locationData, isPending: loadingLocations } = useGetEvents();

  // Debounce search input to prevent excessive API calls
  const [debouncedSearch] = useDebounce(searchParams, 500);

  // Fetch events data
  const {
    data: eventsData,
    isPending: loadingEvents,
    error: eventsError,
  } = useGetEvents({
    page,
    take: 6,
    search: debouncedSearch,
    category: category,
    location: location,
    date: date ? new Date(date) : undefined,
  });

  // Calculate pagination details based on the PageableResponse interface
  const totalItems = eventsData?.meta?.total || 0;
  const itemsPerPage = eventsData?.meta?.take || 6;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = eventsData?.meta?.page || page;

  // Handle pagination
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white pb-12">
      {/* Search section with gradient background */}
      <div className="relative container mx-auto mb-24 flex w-full h-48 items-center justify-center bg-gradient-to-r from-purple-600 to-yellow-400 rounded-b-lg">
        <SearchBarExplore
          className="absolute bottom-0 translate-y-1/2 z-10 mx-auto w-full shadow-xl md:max-w-4/5 md:py-4"
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
          categoryData={categoryData?.data}
        />
      </div>

      {/* Events list section */}
      <section className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Event List</h2>
          {totalItems > 0 && (
            <p className="text-gray-300">
              Showing {eventsData?.data?.length || 0} of {totalItems} events
            </p>
          )}
        </div>

        {/* Loading state */}
        {loadingEvents ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-lg bg-white/10"
              />
            ))}
          </div>
        ) : eventsError ? (
          // Error state
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-red-400 text-lg">
              Failed to load events. Please try again later.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : eventsData && eventsData.data?.length === 0 ? (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-gray-400 text-lg">No events found</p>
            <p className="text-gray-500">
              Try adjusting your search filters or browse all events
            </p>
          </div>
        ) : (
          // Events list with pagination
          <>
            <ExploreList />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage <= 1
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Previous
                  </button>
                  
                  {[...Array(totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    // Show limited page numbers with ellipsis for better UX
                    if (
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={idx}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-8 h-8 flex items-center justify-center rounded ${
                            currentPage === pageNum
                              ? "bg-yellow-400 text-gray-900 font-bold"
                              : "bg-gray-800 text-white hover:bg-gray-700"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === currentPage - 2 ||
                      pageNum === currentPage + 2
                    ) {
                      return <span key={idx} className="text-gray-500">...</span>;
                    }
                    return null;
                  })}
                  
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-3 py-1 rounded ${
                      currentPage >= totalPages
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-purple-600 text-white hover:bg-purple-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default ExploreForm;
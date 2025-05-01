"use client";
import { useState } from "react";
import SearchBar from "./components/search-bar";

const OrganizerEventPage = () => {
  const [searchParams, setSearchParams] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  // duummy data for categories and locations
  const loadingCategories = false;
  const loadingLocations = false;
  const categoryData = ["Music", "Art", "Sports"];
  const locationData = ["New York", "Los Angeles", "Chicago"];
  return (
    <main className="container mx-auto">
      <div className="relative mb-12 flex w-full items-center justify-center bg-gradient-to-r from-purple-600 to-yellow-400">
        <SearchBar
          className="relative top-10 z-10 mx-auto -mt-10  w-full shadow-md md:max-w-4/5 md:py-4"
          searchParams={searchParams}
          onSearch={(search) => setSearchParams(search)}
          categoryParams={category}
          loadingCategories={loadingCategories}
          onCategoryChange={(category) => setCategory(category)}
          locationParams={location}
          loadingLocations={loadingLocations}
          onLocationChange={(location) => setLocation(location)}
          dateParams={date}
          onDateChange={(date) => setDate(date)}
          locationData={locationData}
          categoryData={categoryData}
        />
      </div>
    </main>
  );
};

export default OrganizerEventPage;

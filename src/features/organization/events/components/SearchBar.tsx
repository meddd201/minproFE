"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import Link from "next/link";
import { FC } from "react";


interface SearchBarProps {
  searchParams: string;
  onSearch: (search: string) => void;
  categoryParams: string;
  loadingCategories: boolean;
  onCategoryChange: (category: string) => void;
  loadingLocations: boolean;
  locationParams: string;
  onLocationChange: (location: string) => void;
  dateParams: Date | null;
  onDateChange: (date: Date | null) => void;
  locationData: string[] | undefined;
  categoryData: string[] | undefined;
  title?: string;
  className?: string;
}

const SearchBar: FC<SearchBarProps> = ({
  searchParams,
  onSearch,
  categoryParams,
  loadingCategories,
  onCategoryChange,
  locationParams,
  loadingLocations,
  onLocationChange,
  dateParams,
  onDateChange,
  locationData,
  categoryData,
  className,
  title,
}) => {
  return (
    <div
      className={cn(
        "grid max-w-[90vw] gap-4 rounded-md border bg-white p-4",
        className,
      )}
    >
      {title && <h2 className="text-center text-3xl font-bold">{title}</h2>}
      <search className="grid gap-2 lg:grid-cols-3">
        {/* Search Input */}
        <div className="relative h-fit flex-1 md:col-span-3">
          <Search className="text-muted-foreground absolute top-1/2 left-0 ml-2 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Nyari APAA!?..."
            className="pl-10"
            value={searchParams}
            onChange={(e) => {
              onSearch(e.target.value);
            }}
          />
        </div>
        {/* Location Dropdown */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative flex items-center justify-center">
                <MapPin
                  color="#737373"
                  className="text-color-[#737373] absolute left-2 h-full translate-x-[10%] translate-y-[0%]"
                />
                <Button className="grow" variant="outline">
                  {locationParams ? locationParams : "All"}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="">
              <DropdownMenuRadioGroup className="flex w-[80vw] flex-col md:w-fit">
                <DropdownMenuRadioItem
                  className=""
                  onClick={() => onLocationChange("")}
                  key={"all"}
                  value={"All"}
                >
                  {"All"}
                </DropdownMenuRadioItem>
                {loadingLocations ? (
                  <div className="animate-pulse text-center">
                    Loading locations...
                  </div>
                ) : (
                  locationData?.map((loc) => {
                    const locationName = loc
                      .replace(/_/g, " ")
                      .toLowerCase()
                      .replace(/\b\w/g, (char) => char.toUpperCase());
                    return (
                      <DropdownMenuRadioItem
                        onClick={() => onLocationChange(loc)}
                        key={loc}
                        value={loc}
                      >
                        {locationName}
                      </DropdownMenuRadioItem>
                    );
                  })
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Date Picker */}
        <Popover>
          <div className="relative flex h-full items-center justify-center">
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "grow justify-start text-left font-normal",
                  !dateParams && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="h-full" />
                {dateParams ? (
                  format(dateParams, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            {dateParams && (
              <Button
                onClick={() => onDateChange(null)}
                className="w-fit hover:bg-amber-500 hover:text-black"
              >
                Clear
              </Button>
            )}
          </div>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateParams || new Date()}
              onSelect={(date) => {
                if (date) {
                  onDateChange(date);
                }
              }}
            />
          </PopoverContent>
        </Popover>
        {/* Category Dropdown */}
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative flex h-full items-center">
                <div className="grid h-full items-center justify-center rounded-l-md border p-2 text-center text-sm font-medium text-[#737373]">
                  Category
                </div>
                <Button
                  variant="outline"
                  className="h-full grow rounded-l-none"
                >
                  {categoryParams ? categoryParams : "All"}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="flex w-full">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  className="w-[80vw] md:w-50 lg:w-80"
                  onClick={() => onCategoryChange("")}
                  key={""}
                  value={""}
                >
                  {"All"}
                </DropdownMenuRadioItem>
                {loadingCategories ? (
                  <div className="animate-pulse text-center">
                    Loading category...
                  </div>
                ) : (
                  categoryData?.map((cat) => (
                    <DropdownMenuRadioItem
                      onClick={() => onCategoryChange(cat)}
                      key={cat}
                      value={cat}
                    >
                      {cat}
                    </DropdownMenuRadioItem>
                  ))
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </search>
      <Link href={"/organization/create-event/step1"}>
        <Button
          className="w-full hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
          variant="default"
        >
          Create New Event
        </Button>
      </Link>
    </div>
  );
};

export default SearchBar;

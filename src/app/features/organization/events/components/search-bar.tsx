"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Search } from "lucide-react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";

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
  locationData: string[];
  categoryData: string[];
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
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  className="w-[90vw] md:w-72"
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
                  locationData.map((loc) => (
                    <DropdownMenuRadioItem
                      onClick={() => onLocationChange(loc)}
                      key={loc}
                      value={loc}
                    >
                      {loc}
                    </DropdownMenuRadioItem>
                  ))
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Date Picker */}
        <Popover>
          <div className="relative flex h-full  items-center justify-center">
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
                className="hover:bg-amber-500 hover:text-black w-fit"
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
                  className="w-[90vw] md:w-72"
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
                  categoryData.map((cat) => (
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
    </div>
  );
};

export default SearchBar;

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
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, MapPin, Search, X } from "lucide-react";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";


interface SearchBarExploreProps {
  searchParams: string;
  onSearch: (searchParams: string) => void;
  categoryParams: string;
  loadingCategories: boolean;
  onCategoryChange: (category: string) => void;
  loadingLocations: boolean;
  locationParams: string;
  onLocationChange: (location: string) => void;
  dateParams: Date | null;
  onDateChange: (date: Date | null) => void;
  categoryData: string[] | undefined;
  title?: string;
  className?: string;
}

const SearchBarExplore: FC<SearchBarExploreProps> = ({
  searchParams,
  onSearch,
  categoryParams,
  loadingCategories,
  onCategoryChange,
  locationParams,
  onLocationChange,
  dateParams,
  onDateChange,
  categoryData,
  className,
}) => {
  // For mobile view handling
  const [isMobileSearchExpanded, setIsMobileSearchExpanded] = useState(false);
  
  // Format date for display
  const formattedDate = dateParams ? format(dateParams, "MMM dd, yyyy") : null;
  
  // Build search URL with active filters
  const buildSearchUrl = () => {
    let url = `/explore?search=${encodeURIComponent(searchParams || "")}`;
    if (locationParams) url += `&location=${encodeURIComponent(locationParams)}`;
    if (dateParams) url += `&date=${dateParams.toISOString()}`;
    if (categoryParams) url += `&category=${encodeURIComponent(categoryParams)}`;
    return url;
  };
  
  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4", className)}>
      {/* Desktop View */}
      <div className="hidden md:flex md:flex-row md:gap-3 md:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            type="text"
            placeholder="Search events..."
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 focus-visible:ring-purple-500"
            value={searchParams}
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        {/* Location Dropdown */}
        <div className="min-w-[140px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MapPin className="mr-2 h-4 w-4 text-purple-500" />
                <span className="truncate">
                  {locationParams ? locationParams : "All Locations"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">
              <DropdownMenuRadioGroup value={locationParams || ""}>
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  onClick={() => onLocationChange("")}
                  value=""
                >
                  All Locations
                </DropdownMenuRadioItem>
                {/* Location items would be mapped here */}
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  onClick={() => onLocationChange("Jakarta")}
                  value="Jakarta"
                >
                  Jakarta
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  onClick={() => onLocationChange("Bali")}
                  value="Bali"
                >
                  Bali
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  onClick={() => onLocationChange("Bandung")}
                  value="Bandung"
                >
                  Bandung
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Date Picker */}
        <div className="min-w-[180px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800",
                  !dateParams && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                {formattedDate ? (
                  <span>{formattedDate}</span>
                ) : (
                  <span>Pick a date</span>
                )}
                {dateParams && (
                  <X 
                    className="ml-auto h-4 w-4 hover:text-red-500 cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onDateChange(null);
                    }}
                  />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
              <Calendar
                mode="single"
                selected={dateParams || undefined}
                onSelect={(e) =>onDateChange(e ? new Date(e) : null) }
                initialFocus
                className="rounded-md border"
                required
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Category Dropdown */}
        <div className="min-w-[160px]">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <span className="mr-2 h-4 w-4 flex items-center justify-center text-purple-500 font-bold">#</span>
                <span className="truncate">
                  {categoryParams ? categoryParams : "All Categories"}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px] max-h-[300px] overflow-y-auto">
              <DropdownMenuRadioGroup value={categoryParams || ""}>
                <DropdownMenuRadioItem
                  className="cursor-pointer"
                  onClick={() => onCategoryChange("")}
                  value=""
                >
                  All Categories
                </DropdownMenuRadioItem>
                {loadingCategories ? (
                  <div className="py-2 text-center animate-pulse">
                    Loading categories...
                  </div>
                ) : (
                  categoryData?.map((cat) => (
                    <DropdownMenuRadioItem
                      className="cursor-pointer"
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

        {/* Search Button */}
        <Link href={buildSearchUrl()}>
          <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white min-w-[100px]">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </Link>
      </div>

      {/* Mobile View */}
      <div className="md:hidden">
        {!isMobileSearchExpanded ? (
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
            onClick={() => setIsMobileSearchExpanded(true)}
          >
            <Search className="mr-2 h-5 w-5" />
            Search Events
          </Button>
        ) : (
          <div className="flex flex-col gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
              <Input
                type="text"
                placeholder="Search events..."
                className="pl-10 bg-gray-50 dark:bg-gray-900"
                value={searchParams}
                onChange={(event) => onSearch(event.target.value)}
              />
            </div>
            
            {/* Filters row */}
            <div className="grid grid-cols-2 gap-2">
              {/* Location Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="mr-2 h-4 w-4 text-purple-500" />
                    <span className="truncate">
                      {locationParams ? locationParams : "Location"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                  <DropdownMenuRadioGroup value={locationParams || ""}>
                    <DropdownMenuRadioItem
                      onClick={() => onLocationChange("")}
                      value=""
                    >
                      All Locations
                    </DropdownMenuRadioItem>
                    {/* Location items would be mapped here */}
                    <DropdownMenuRadioItem
                      onClick={() => onLocationChange("Jakarta")}
                      value="Jakarta"
                    >
                      Jakarta
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => onLocationChange("Bali")}
                      value="Bali"
                    >
                      Bali
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Category Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <span className="mr-2 h-4 w-4 flex items-center justify-center text-purple-500 font-bold">#</span>
                    <span className="truncate">
                      {categoryParams ? categoryParams : "Category"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[calc(100vw-2rem)]">
                  <DropdownMenuRadioGroup value={categoryParams || ""}>
                    <DropdownMenuRadioItem
                      onClick={() => onCategoryChange("")}
                      value=""
                    >
                      All Categories
                    </DropdownMenuRadioItem>
                    {loadingCategories ? (
                      <div className="py-2 text-center animate-pulse">
                        Loading categories...
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

            {/* Date Picker */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start",
                    !dateParams && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-purple-500" />
                  {formattedDate ? (
                    <span>{formattedDate}</span>
                  ) : (
                    <span>Pick a date</span>
                  )}
                  {dateParams && (
                    <X 
                      className="ml-auto h-4 w-4 hover:text-red-500 cursor-pointer" 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDateChange(null);
                      }}
                    />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateParams || undefined}
                  onSelect={(e) =>onDateChange(e ? new Date(e) : null)}
                  initialFocus
                  className="rounded-md border"
                  required
                />
              </PopoverContent>
            </Popover>

            {/* Action buttons */}
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsMobileSearchExpanded(false)}
              >
                Cancel
              </Button>
              
              <Link href={buildSearchUrl()} className="flex-1">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Active Filters (Desktop & Mobile) */}
      {(locationParams || dateParams || categoryParams) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {categoryParams && (
            <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-sm">
              <span className="font-medium">Category: {categoryParams}</span>
              <X 
                className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => onCategoryChange("")}
              />
            </div>
          )}
          
          {locationParams && (
            <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-sm">
              <span className="font-medium">Location: {locationParams}</span>
              <X 
                className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => onLocationChange("")}
              />
            </div>
          )}
          
          {dateParams && (
            <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-sm">
              <span className="font-medium">Date: {formattedDate}</span>
              <X 
                className="ml-1 h-3 w-3 cursor-pointer hover:text-red-500" 
                onClick={() => onDateChange(null)}
              />
            </div>
          )}
          
          {(locationParams || dateParams || categoryParams) && (
            <Button 
              variant="ghost" 
              className="h-6 px-2 py-0 text-xs text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
              onClick={() => {
                onCategoryChange("");
                onLocationChange("");
                onDateChange(null);
              }}
            >
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBarExplore;
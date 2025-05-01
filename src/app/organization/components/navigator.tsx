"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import React from "react";

export const Navigator = () => {
  const pathname = usePathname();
  const allowedPaths = ["/events", "/profile", "/settings", "/transactions"];
  if (!allowedPaths.some((path) => pathname.includes(path))) {
    return null;
  }

  return (
    <div className="relative container mx-auto flex flex-col items-center bg-gradient-to-r from-purple-600 to-yellow-400 pb-4 font-sans">
      <h1 className="p-6 text-center text-4xl font-bold text-white">
        Organizer Dashboard
      </h1>
      <div className="relative flex flex-row items-start rounded-lg bg-gray-300 p-1">
        <Input
          type="radio"
          name="tab"
          id="tab1"
          className="absolute h-7 w-32 opacity-0"
        />
        <Label
          className="relative z-10 flex h-7 w-32 cursor-pointer items-center justify-center text-sm opacity-60"
          htmlFor="tab1"
        >
          Profile
        </Label>
        <Input
          type="radio"
          name="tab"
          id="tab2"
          className="absolute h-7 w-32 opacity-0"
        />
        <Label
          className="relative z-10 flex h-7 w-32 cursor-pointer items-center justify-center text-sm opacity-60"
          htmlFor="tab2"
        >
          Settings
        </Label>
        <Input
          type="radio"
          name="tab"
          id="tab3"
          className="absolute h-7 w-32 opacity-0"
        />
        <Label
          className="relative z-10 flex h-7 w-32 cursor-pointer items-center justify-center text-sm opacity-60"
          htmlFor="tab3"
        >
          Notifications
        </Label>
        <div className="absolute top-1 left-1 h-7 w-32 rounded-md bg-white shadow-md transition-all duration-200 ease-out" />
      </div>
    </div>
  );
};

export default Navigator;

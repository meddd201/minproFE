"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

export const Navigator: FC = () => {
  const pathname = usePathname();
  const allowedPaths = [
    "/organization/events",
    "/organization/profile",
    "/organization/transactions",
  ];

  // Return null if the current path is not allowed
  if (!allowedPaths.includes(pathname)) {
    return null;
  }

  // Extract the current subpath after "/organization/"
  const pathnameNav = pathname.split("/").slice(2).join("/");

  return (
    <div className="relative container mx-auto flex flex-col items-center bg-gradient-to-r from-purple-600 to-yellow-400 pb-4 font-sans">
      <h1 className="p-6 text-center text-4xl font-bold text-white">
        Organizer Dashboard
        <span className="block text-lg font-normal">{pathnameNav}</span>
      </h1>

      <div className="mx-5 flex space-x-2 rounded-full bg-slate-500/30">
        {allowedPaths.map((path) => {
          const tabName = path.replace("/organization/", ""); // Extract tab name from path
          return (
            <SelectTabs
              key={tabName}
              nameTabs={tabName}
              currentPath={pathnameNav}
            />
          );
        })}
      </div>
    </div>
  );
};

interface SelectTabsProps {
  nameTabs: string;
  currentPath: string;
}

const SelectTabs: FC<SelectTabsProps> = ({ nameTabs, currentPath }) => {
  const isActive = currentPath === nameTabs;

  return (
    <Link
      className={cn(
        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
        {
          "bg-white/80 text-black": isActive,
          "text-white hover:bg-slate-500/30": !isActive,
        },
      )}
      href={`/organization/${nameTabs}`}
    >
      {nameTabs.charAt(0).toUpperCase() + nameTabs.slice(1)}
    </Link>
  );
};

export default Navigator;

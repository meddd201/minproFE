"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useAuthStore } from "../../../../stores/auth";

const ChangePict = () => {
  const { user } = useAuthStore();
  return (
    <div className="shrink flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-4 shadow-md shadow-black/20 md:flex md:w-1/3">
      <div className="relative mx-auto aspect-square w-1/3 overflow-clip border-2 p-1">
        <Image
          src={user?.profilePict || "/logo/logo.svg"}
          alt="Profile"
          fill
          className="aspect-square"
        />
      </div>

      <Button
        type="submit"
        className="my-2 w-full border-2 bg-transparent text-black hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black md:flex"
      >
        Select Photo
      </Button>
      <div className="md:text-md text-center text-sm text-gray-500">
        Besar file: maksimum 2MB. Ekstensi file yang diperbolehkan: .PNG .JPG
        .AVIF
      </div>
    </div>
  );
};

export default ChangePict;

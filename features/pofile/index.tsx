"use client";
import React, { use } from "react";
import { useAuthStore } from "../../stores/auth";
import Image from "next/image";
import { Edit, Edit2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <main className="container mx-auto min-h-[calc(100vh-50px)] items-center bg-[url('/login/g1.svg')] bg-cover bg-center p-4 bg-black/20 bg-blend-color">
        <h1 className="mx-auto py-4 text-center text-2xl md:text-3xl w-fit bg-white rounded-md mb-2 px-2 font-bold">PROFILE PAGE</h1>
      <div className="flex flex-col gap-4 md:flex-row md:px-[50px] my-5">
      <div className=" shrink flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-4 shadow-md shadow-black/20 md:flex md:w-1/3">
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
        Besar file: maksimum 2MB. Ekstensi file yang diperbolehkan: .PNG
        .JPG .AVIF
        </div>
      </div>
      <div className="flex-col space-y-2 md:grow">
        <div className="rounded-lg border bg-white p-4 shadow-md shadow-black/20">
        <h2 className="text-center text-2xl font-bold">User Information</h2>
        <p>
          <strong>Name:</strong> {user?.username || "N/A"}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p>
          <strong>Role:</strong> {user?.role || "N/A"}
        </p>
        <p>
          <strong>Point:</strong> {user?.email || "N/A"}
        </p>
        </div>
        {user?.role !== "ADMIN" && (
        <Link href={"/register-organizer"}>
          <Button className="w-full rounded-lg border-2 bg-white p-4 text-center text-black shadow-md shadow-black/20 hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black">
          Create Organizer Account
          </Button>
        </Link>
        )}
        <Button className="my-2 w-full rounded-lg border-2 bg-white p-4 text-center text-black shadow-md shadow-black/20 hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black">
        Reset Password
        </Button>
      </div>
      </div>
    </main>
  );
};

export default ProfilePage;

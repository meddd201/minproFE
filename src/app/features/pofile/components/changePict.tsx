"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_EMPTY_PROFILE_IMAGE } from "@/config/env";
import useProfilePicture from "@/hooks/api/profile/useUpdatePicture";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef } from "react";
import { toast } from "sonner";

const ChangePict = () => {
  const session = useSession();
  const user = session?.data?.user;

  const Pictref = useRef<HTMLInputElement>(null);
  const { mutateAsync: changeProfile, isPending } = useProfilePicture();
  const profileSrc =
    user?.profilePict === "null" || !user?.profilePict
      ? DEFAULT_EMPTY_PROFILE_IMAGE
      : user?.profilePict;
  const onchangePict = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/avif"].includes(file.type)) {
        toast.error("Only JPEG, PNG, or AVIF files are allowed");
        return;
      }
      await changeProfile(file);
    }
  };

  return (
    <div className="shrink flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border bg-white p-4 shadow-md shadow-black/20 lg:flex lg:w-1/3">
      <div className="relative mx-auto aspect-square w-1/3 overflow-clip border-2 p-1">
        <Image
          src={profileSrc}
          alt="Profile"
          fill
          className="aspect-square"
        />
      </div>

      <Button
        disabled={isPending}
        className="w-full p-0 hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
      >
        <label htmlFor="Pict" className="w-full cursor-pointer text-center">
          Change Picture
        </label>
        <Input
          className="hidden"
          disabled={isPending}
          ref={Pictref}
          id="Pict"
          name="Pict"
          type="file"
          accept="image/*"
          onChange={onchangePict}
        />
      </Button>

      <div className="md:text-md text-center text-sm text-gray-500">
        Besar file: maksimum 2MB. Ekstensi file yang diperbolehkan: .PNG .JPG
        .AVIF
      </div>
    </div>
  );
};

export default ChangePict;

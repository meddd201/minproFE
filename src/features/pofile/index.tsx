"use client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ChangePict from "./components/changePict";
import ProfileCard from "./components/profileCard";
import ChangePassButton from "./components/resetPassButton";

const ProfilePage = () => {
  const session = useSession();
  const user = session?.data?.user;

  return (
    <main className="container mx-auto min-h-[calc(100vh-50px)] items-center bg-black/20 bg-[url('/login/g1.svg')] bg-cover bg-center p-4 bg-blend-color">
      <h1 className="mx-auto mb-2 w-fit rounded-md bg-white px-2 py-4 text-center text-2xl font-bold md:text-4xl">
        PROFILE PAGE
      </h1>
      <div className="my-5 flex flex-col gap-4 md:px-[50px] lg:flex-row">
        <ChangePict />
        <div className="flex-col space-y-2 md:grow">
          <ProfileCard />
          {user?.role === "USER" && (
            <Link href={"/register-organizer"}>
              <Button className="w-full rounded-lg border-2 bg-white p-4 text-center text-black shadow-md shadow-black/20 hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black">
                Create Organizer Account
              </Button>
            </Link>
          )}
          <ChangePassButton />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

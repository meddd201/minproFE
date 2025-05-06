"use client";

import ErrorComponent from "@/components/errorComponent";
import Loading from "@/components/loading/loading";
import { Card } from "@/components/ui/card";
import useGetOrgProfile from "@/hooks/api/profile/useGetOrganizerProfile";
import Image from "next/image";
import { format } from "date-fns";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrganizerProfilePage = () => {
  const { data, isPending, error } = useGetOrgProfile();
  if (isPending) return <Loading className="contianer mx-auto h-[100vh]" />;
  if (error)
    return (
      <ErrorComponent className="container mx-auto flex h-[100vh] items-center justify-center" />
    );
  return (
    <main className="min-h-screen">
      <section className="container m-8 mx-auto ">
        <Card className="gap-2 p-4">
          <div className="flex flex-col items-center gap-4 p-4 sm:flex-row">
            <Card className="relative aspect-square h-[100px] w-[100px] overflow-hidden rounded-full border-2">
              <Image
                src={data.data.organizerPicture || "/profile/empty.svg"}
                alt="Organizer Image"
                fill
                priority
                className="rounded-full object-cover"
              />
            </Card>
            <div>
              <h2 className="grow text-3xl text-center sm:text-left">{data.data.name}</h2>
              <p className="text-[#606060]"> join since :{format(data.data.createdAt, "d MMMM yyyy")}</p>
              <p className="text-[#606060]"> slug :{data.data.slug}</p>
            </div>
          </div>
          <h2 className="text-lg font-semibold">Payment</h2>
          <Card className="grid grid-cols-2 gap-1 p-2">
            <p>Bank Name :</p>
            <p>{data.data.bankTarget}</p>
            <p>Account Number :</p>
            <p>{data.data.paymentTarget}</p>
          </Card>
          <h2 className="text-lg font-semibold">Description</h2>
          <Card className="p-2">
            <Markdown content={data.data.description} />
          </Card>
        </Card>
      </section>
      <section className="container mx-auto my-8 flex flex-col items-end justify-end gap-4">
        <Link href="/organization/profile/edit">
        <Button className="hover:border-3 hover:border-black hover:bg-amber-500 hover:text-xl hover:text-black">
          Edit My Profile
        </Button>
        </Link>
      </section>
    </main>
  );
};

export default OrganizerProfilePage;

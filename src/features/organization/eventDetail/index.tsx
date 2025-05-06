"use client";
import ErrorComponent from "@/components/errorComponent";
import Loading from "@/components/loading/loading";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import formatRupiah from "@/utils/formatingRupiah";
import Image from "next/image";
import { FC } from "react";
import Markdown from "@/components/Markdown";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarDaysIcon,
  MapPin,
} from "lucide-react";
import { formatLocation } from "@/utils/formatinLocation";

interface OrganizerEventDetailPageProps {
  eventId: string;
}
const OrganizerEventDetailPage: FC<OrganizerEventDetailPageProps> = ({
  eventId,
}) => {
  const { data: eventData, isPending, error } = useGetOrgDetailEvent(eventId);
  if (error) {
    return (
      <ErrorComponent message={error.message ? error.message : "not Found"} />
    );
  }
  if (isPending) {
    return <Loading className="w-100vh" />;
  }
  return (
    <main className="mb-8">
      <section className="relative container mx-auto mb-8">
        <h2 className="my-2 pl-4 text-2xl">Details</h2>
        <Card>
          <div className="relative mx-auto h-[200px] w-full overflow-hidden rounded-lg md:h-[300px]">
            <Image
              src={eventData.data?.image || "/notfan.png"}
              alt="Event Image"
              fill
              priority
              quality={100}
              className="h-auto w-full object-contain"
            />
          </div>
          <CardDescription className="mx-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Locations</h3>
              <div className="relative pl-8">
                <MapPin className="absolute left-0 aspect-square h-full" />
                <p className="text-lg font-light">
                  {formatLocation(eventData.data?.location)}
                </p>
              </div>
            </div>
          </CardDescription>
          <CardDescription className="mx-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Date</h3>
              <div className="relative pl-8">
                <CalendarDaysIcon className="absolute left-0 aspect-square h-full" />
                <p className="text-lg font-light">
                  Start Date :{" "}
                  {format(eventData.data?.eventStart, " d MMMM yyyy")}
                </p>
              </div>
              <div className="relative pl-8">
                <CalendarArrowDown className="absolute left-0 aspect-square h-full" />
                <p className="text-lg font-light">
                  End Date :{format(eventData.data?.eventEnd, " d MMMM yyyy")}
                </p>
              </div>
            </div>
          </CardDescription>
          <CardDescription className="mx-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-xl">Description</h3>
              {eventData.data.description && (
                <Markdown content={eventData.data.description} />
              )}
            </div>
          </CardDescription>
        </Card>
      </section>
      <section className="relative container mx-auto mb-8">
        <h2 className="my-2 pl-4 text-2xl">Tickets</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantitiy</TableHead>
                <TableHead>Buyed</TableHead>
                <TableHead>Available</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventData.data?.tickets?.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.name}</TableCell>
                  <TableCell>{formatRupiah(ticket.price)}</TableCell>
                  <TableCell>{`${ticket.amount} x`}</TableCell>
                  <TableCell>{`${ticket.buyed} x`}</TableCell>
                  <TableCell>{ticket.amount - ticket.buyed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section className="relative container mx-auto mb-8">
        <h2 className="my-2 text-2xl">Voucher</h2>
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">name</TableHead>
                <TableHead>Amount Discount</TableHead>
                <TableHead>Valid Time</TableHead>
                <TableHead>Quota</TableHead>
                <TableHead>Used</TableHead>
                <TableHead>Available Quota</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventData.data?.eventVoucher?.map((voucher) => (
                <TableRow key={voucher.id}>
                  <TableCell>{voucher.name}</TableCell>
                  <TableCell>{formatRupiah(voucher.amountDiscount)}</TableCell>
                  <TableCell>{`${format(new Date(voucher.startDate), "d MMM yyyy")} - ${format(new Date(voucher.endDate), "d MMM yyyy")}`}</TableCell>
                  <TableCell>{`${voucher.quota} x`}</TableCell>
                  <TableCell>{`${voucher.used} x`}</TableCell>
                  <TableCell>{`${voucher.quota - voucher.used} x`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default OrganizerEventDetailPage;

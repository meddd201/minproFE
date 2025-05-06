"use client";
import React, { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { format } from "date-fns";
import Link from "next/link";
import { ChevronDown, Eye } from "lucide-react";

import Loading from "@/components/loading/loading";
import { PaginationComponent } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ErrorComponent from "@/components/errorComponent";

import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import useGetTransactionEvents from "@/hooks/api/transactions/useGetTransactionEvents";
import formatRupiah from "@/utils/formatingRupiah";

import { useStoreOrgBack } from "@/stores/orderOrganizerBack";
import TransactionChart from "@/components/charts/TransactionCharts";
import TotalIncome from "@/components/charts/TotalIncome";
import { parseAsInteger, useQueryState } from "nuqs";
import { formatStatus } from "@/utils/formatingStatus";
import { TransactionStatus } from "@/types/transaction";

interface EventTransactionProps {
  eventId: string;
}

const EventTransactionsPage: FC<EventTransactionProps> = ({ eventId }) => {
  const {
    data: eventData,
    isPending: _eventPending,
    error: _eventError,
  } = useGetOrgDetailEvent(eventId);
  const [searchUser, setSearchUser] = useQueryState("search", {
    defaultValue: "",
  });
  const [debounceSearchUser] = useDebounce(searchUser, 500);
  const [searchTicket, setSearchTicket] = useQueryState("ticket", {
    defaultValue: "",
  });

  const [searchStatus, setSearchStatus] = useQueryState("status", {
    defaultValue: "",
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, isPending, error } = useGetTransactionEvents({
    page,
    take: 10,
    date: "",
    search: debounceSearchUser,
    ticket: searchTicket,
    sortOrder: "desc",
    eventid: eventId,
    status: searchStatus,
  });

  const { changeRef } = useStoreOrgBack();
  useEffect(() => {
    changeRef(`/organization/events/${eventId}/transactions`);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchUser, searchTicket, searchStatus]);

  const renderTickets = (tickets: { ticketName: string; quantity: number }[]) =>
    tickets.map((ticket) => (
      <div
        key={ticket.ticketName}
        className="text-xs font-semibold text-gray-700"
      >
        {`${ticket.quantity} x ${ticket.ticketName}`}
      </div>
    ));

  const renderTableRows = () =>
    data?.data.map((user) => (
      <TableRow key={user.id}>
        <TableCell className="whitespace-nowrap">
          {user.receiptNumber}
        </TableCell>
        <TableCell className="font-medium break-words whitespace-pre-wrap">
          {user.username}
        </TableCell>
        <TableCell className="flex w-[100px] break-words whitespace-pre-wrap">
          {formatStatus(user.status)}
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-2">
            {renderTickets(user.tickets)}
          </div>
        </TableCell>
        <TableCell>
          {format(new Date(user.updatedAt), "yyyy-MM-dd HH:mm")}
        </TableCell>
        <TableCell>{formatRupiah(user.totalPrice)}</TableCell>
        <TableCell>
          <Link
            className="hover:text-blue-500"
            href={`/organization/transactions/${user.receiptNumber}`}
          >
            <Eye className="hover:scale-110" />
          </Link>
        </TableCell>
      </TableRow>
    ));

  return (
    <section className="container mx-auto mt-10 w-full items-center justify-center px-4">
      <TransactionChart eventId={eventId} />
      <TotalIncome eventId={eventId} className="mb-8" />
      <div className="mb-4 grid w-full gap-2 sm:flex sm:flex-row">
        <div className="relative flex grow flex-col sm:max-w-[300px]">
          <Label className="pl-2 text-sm font-semibold text-gray-700">
            Search User
          </Label>
          <Input
            type="text"
            placeholder="Search by username"
            className="w-full rounded-md border p-2 text-sm"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <div className="flex grow flex-col md:max-w-[200px]">
          <Label className="pl-2 text-sm font-semibold text-gray-700">
            Ticket Type
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-muted-foreground relative grow cursor-pointer rounded-md border bg-white p-2 text-sm">
                {searchTicket || "All"}
                <ChevronDown className="absolute top-0 right-2 h-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="flex w-full">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  onClick={() => setSearchTicket("")}
                  value=""
                >
                  All
                </DropdownMenuRadioItem>
                {eventData?.data.tickets?.map((cat) => (
                  <DropdownMenuRadioItem
                    onClick={() => setSearchTicket(cat.name)}
                    key={cat.name}
                    value={cat.name}
                  >
                    {cat.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex min-w-[100px] flex-col md:max-w-[300px]">
          <Label className="pl-2 text-sm font-semibold text-gray-700">
            Status
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="text-muted-foreground relative grow cursor-pointer rounded-md border bg-white p-2 pr-8 text-sm">
                {formatStatus(searchStatus) || "All"}
                <ChevronDown className="absolute top-0 right-2 h-full" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="flex w-full">
              <DropdownMenuRadioGroup className="w-[80vw] md:w-[200px]">
                <DropdownMenuRadioItem
                  onClick={() => setSearchStatus("")}
                  value=""
                >
                  All
                </DropdownMenuRadioItem>
                {Object.values(TransactionStatus).map((status) => (
                  <DropdownMenuRadioItem
                    onClick={() => setSearchStatus(status)}
                    key={status}
                    value={status}
                  >
                    {formatStatus(status)}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {error && (
        <ErrorComponent
          message={error.message}
          className="container mx-auto flex min-h-[50vh] py-10"
        />
      )}
      {isPending && (
        <Loading className="container mx-auto mt-10 min-h-[70vh] w-full items-center justify-center px-4" />
      )}

      {!isPending && !error && (
        <div className="min-h-[50vh] w-full items-center justify-center">
          <div className="my-2 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipt Number</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Purchase Item</TableHead>
                  <TableHead>Last Update</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead>Detail</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{renderTableRows()}</TableBody>
            </Table>
          </div>
          <PaginationComponent
            totalPages={Math.ceil(data!.meta.total / data!.meta.take)}
            currentPage={data!.meta.page}
            setPage={setPage}
          />
        </div>
      )}
    </section>
  );
};

export default EventTransactionsPage;

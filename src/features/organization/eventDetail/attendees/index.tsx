"use client";
import { format } from "date-fns";

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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrgAttEvents from "@/hooks/api/events/useGetOrgAttEvents";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FC, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface AtendeeListProps {
  eventId: string;
}

const AttendeesPage: FC<AtendeeListProps> = ({ eventId }) => {
  const [searchUser, setSearch] = useState("");
  const [debounceSearchUser] = useDebounce(searchUser, 500);
  const [searchTicket, setSearchTicket] = useState("");
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const { data, isPending, error } = useGetOrgAttEvents(eventId, {
    search: debounceSearchUser,
    ticket: searchTicket,
    page: page,
    take: take,
    sortOrder: "desc",
  });
  const { data: eventData } = useGetOrgDetailEvent(eventId);

  useEffect(() => {
    setPage(1);
  }, [debounceSearchUser, searchTicket]);

  return (
    <section className="container mx-auto mt-10 w-full items-center justify-center px-4">
      <search className="mb-4 flex w-full flex-row gap-2">
        <div className="flex max-w-[300px] grow flex-col">
          <Label className="pl-2 text-sm font-semibold text-gray-700">
            Search User
          </Label>
          <Input
            type="text"
            placeholder="Search by username"
            className="w-full rounded-md border p-2 text-sm"
            value={searchUser}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <Label className="pl-2 text-sm font-semibold text-gray-700">
            Ticket Type
          </Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative flex h-full items-center">
                <Button
                  variant="outline"
                  className="text-muted-foreground h-full grow text-sm"
                >
                  {searchTicket ? searchTicket : "All"}
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="flex w-full">
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem
                  className="w-[80vw] md:w-50 lg:w-80"
                  onClick={() => setSearchTicket("")}
                  key={""}
                  value={""}
                >
                  {"All"}
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
      </search>
      {isPending && (
        <Loading className="container mx-auto mt-10 w-full items-center justify-center px-4" />
      )}

      {!isPending && !error && (
        <div>
          <div className="my-2 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Last Purchase</TableHead>
                  <TableHead>Quantity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((atendee) => (
                  <TableRow key={atendee.id}>
                    <TableCell className="font-medium break-words whitespace-pre-wrap">
                      {atendee.usersEvent.user.username}
                    </TableCell>
                    <TableCell>{atendee.ticket.name}</TableCell>
                    <TableCell>
                      {format(new Date(atendee.updatedAt), "yyyy-MM-dd HH:mm")}
                    </TableCell>
                    <TableCell>{atendee.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <PaginationComponent
            totalPages={data!.meta.total / data!.meta.take}
            currentPage={data!.meta.page}
            setPage={(page) => {
              setPage(page);
            }}
          />
        </div>
      )}
    </section>
  );
};

export default AttendeesPage;

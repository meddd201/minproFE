"use client";

import Loading from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import useDeleteTicket from "@/hooks/api/ticket/useDeleteTicket";
import formatRupiah from "@/utils/formatingRupiah";
import { Pencil, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { FC, useState } from "react";
import TicketDialogCreate from "./components/StepTwoDialogCreate";
import TicketDialogEdit from "./components/StepTwoDialogEdit";
import { Ticket } from "@/types/ticket";

interface StepTwoIDPageProps {
  eventid: string;
}

const StepTwoIDPage: FC<StepTwoIDPageProps> = ({ eventid }) => {
  const { data: NewData, isPending, error } = useGetOrgDetailEvent(eventid);
  const { mutateAsync: deleteTicket, isPending: pendingDelete } =
    useDeleteTicket(eventid);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [ticketToEdit, setTicketToEdit] = useState<Ticket | null>();
  const router = useRouter();
  if (isPending)
    return <Loading className="container mx-auto h-[100vh] items-center" />;

  if (error) return redirect("/organization");

  const handlecloseEditDialog = () => {
    setIsDialogEditOpen(false);
    setTicketToEdit(null);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Adjust Tickets for Event</h1>
        <div className="gap">
          <p className="text-muted-foreground text-xl">{NewData.data.name}</p>
          <p className="text-muted-foreground"> Event ID: {eventid}</p>
        </div>
      </div>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ticket Types</h2>
            <Button onClick={() => setIsDialogOpen(true)}>Add Ticket</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Buyed</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NewData.data!.tickets!.length > 0 ? (
                  NewData.data!.tickets!.map((ticket, index) => (
                    <TableRow key={index}>
                      <TableCell>{ticket.name}</TableCell>
                      <TableCell>
                        {ticket.price === 0
                          ? "Free"
                          : `${formatRupiah(ticket.price)}`}
                      </TableCell>
                      <TableCell>{ticket.amount}</TableCell>
                      <TableCell>{ticket.buyed}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              setTicketToEdit(ticket);
                              setIsDialogEditOpen(true);
                            }}
                            size="sm"
                            variant="ghost"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => deleteTicket(ticket.id)}
                            disabled={ticket.buyed > 0}
                            size="sm"
                            variant="ghost"
                            className="text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-muted-foreground text-center"
                    >
                      No tickets yet. Click "Add Ticket" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              onClick={() =>
                router.push(`/organization/create-event/step1/${eventid}`)
              }
              disabled={isPending || pendingDelete}
            >
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant={"secondary"}
                onClick={() =>
                  NewData.data.status === "DRAFT"
                    ? router.push(`/organization/events`)
                    : router.push(`/organization/events/${eventid}`)
                }
                disabled={isPending || pendingDelete}
              >
                Save Change
              </Button>

              {NewData.data.tickets && NewData.data.tickets.length > 0 && (
                <Button
                  onClick={() =>
                    router.push(`/organization/create-event/step3/${eventid}`)
                  }
                  disabled={
                    pendingDelete ||
                    isPending ||
                    NewData.data.tickets.length < 1
                  }
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <TicketDialogCreate
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        eventId={eventid}
      />
      {ticketToEdit && (
        <TicketDialogEdit
          isOpen={isDialogEditOpen}
          onClose={handlecloseEditDialog}
          eventId={eventid}
          ticketData={ticketToEdit as Ticket}
        />
      )}
    </section>
  );
};

export default StepTwoIDPage;

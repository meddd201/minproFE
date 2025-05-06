"use client";

import Loading from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGetOrgDetailEvent from "@/hooks/api/events/useGetOrgDetailEvent";
import { redirect } from "next/navigation";
import { FC, useState } from "react";
import TicketDialog from "./components/StepTwoDialog";
import formatRupiah from "@/utils/formatingRupiah";
import Link from "next/link";

interface StepTwoIDPageProps {
  eventid: string;
}

const StepTwoIDPage: FC<StepTwoIDPageProps> = ({ eventid }) => {
  const { data: NewData, isPending, error } = useGetOrgDetailEvent(eventid);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (isPending)
    return <Loading className="container mx-auto h-[100vh] items-center" />;

  if (error) return redirect("/organization");

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Create Tickets for Event</h1>
        <p className="text-muted-foreground mb-4">Event ID: {eventid}</p>
      </div>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ticket Types</h2>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsDialogOpen(true)}
            >
              Add Ticket
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(index)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button> */}
                          {/* <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500"
                            onClick={() => handleDelete(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button> */}
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

          {NewData.data.tickets && NewData.data.tickets.length > 0 && (
            <Link
              href={`/organization/step3/${eventid}`}
              className="flex justify-end pt-4"
            >
              <Button
                disabled={isPending || NewData.data.tickets.length < 1}
                className="bg-green-600 hover:bg-green-700"
              >
                Save & Continue
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      <TicketDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        eventId={eventid}
      />
    </section>
  );
};

export default StepTwoIDPage;

"use client";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Menu, Pencil, Plus, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckboxItem } from "@radix-ui/react-dropdown-menu";
import { use, useState } from "react";
import userCreateTicket from "@/hooks/api/events/useCreateTicket";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

type Ticket = {
  name: string;
  price: number;
  quantity: number;
};

const validationSchema = Yup.object({
  name: Yup.string().min(3, "At least 3 characters").required("Required"),
  price: Yup.number().min(0, "Must be positive").required("Required"),
  quantity: Yup.number().min(1, "At least 1").required("Required"),
});

export default function CreateTicketPage() {
  console.log("CreateTicketPage rendered");

  const router = useRouter();
  const { eventid } = useParams();
  //comment seharusnya sesuai dengan eventId
  const { mutateAsync: createTicket, isPending } = userCreateTicket("");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      quantity: 1,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      if (editIndex !== null) {
        const updated = [...tickets];
        updated[editIndex] = values;
        setTickets(updated);
        setEditIndex(null);
      } else {
        setTickets((prev) => [...prev, values]);
      }
      setIsDialogOpen(false);
      formik.resetForm();


      //ini data yang belum kelar
      // const result = await createTicket(values);
      // const eventId = result.data.id; // Assuming the API returns the created ticket ID
      router.push(`/organization/create-event/step3/${eventid}`);
    },
  });

  // Handle dialog close
  const handleEdit = (index: number) => {
    const ticket = tickets[index];
    formik.setValues(ticket);
    setEditIndex(index);
    setIsDialogOpen(true);
  };
  const handleDelete = (index: number) => {
    setTickets((prev) => prev.filter((_, i) => i !== index));
  };

  //   const handleSubmitAll = async () => {
  //     for (const ticket of tickets) {
  //       await createTicket({ ...ticket, eventId: eventid });
  //     }
  //     router.push(`/organization/create-event/step3/${eventid}`);
  //   };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold">Create Tickets for Event</h1>
        <p className="text-muted-foreground mb-4">Event ID: {eventid}</p>
      </div>
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ticket Types</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Ticket
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editIndex !== null ? "Edit Ticket" : "Add Ticket"}
                  </DialogTitle>
                  <DialogDescription>
                    {editIndex !== null
                      ? "Update ticket details."
                      : "Create a new ticket type for your event."}
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Ticket Name</label>
                    <Input
                      name="name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Price (IDR)</label>
                      <Input
                        type="number"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Quantity</label>
                      <Input
                        type="number"
                        name="quantity"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={!formik.isValid}>
                      {editIndex !== null ? "Update" : "Add"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Ticket Table */}
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
                {tickets.length > 0 ? (
                  tickets.map((ticket, index) => (
                    <TableRow key={index}>
                      <TableCell>{ticket.name}</TableCell>
                      <TableCell>
                        {ticket.price === 0
                          ? "Free"
                          : `IDR ${ticket.price.toLocaleString()}`}
                      </TableCell>
                      <TableCell>{ticket.quantity}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(index)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-500"
                            onClick={() => handleDelete(index)}
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
                      colSpan={5}
                      className="text-muted-foreground text-center"
                    >
                      No tickets yet. Click "Add Ticket" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {tickets.length > 0 && (
            <div className="flex justify-end pt-4">
              <Button
                disabled={isPending || formik.isValid}
                type="submit"
                // onClick={handleSubmitAll}
                className="bg-green-600 hover:bg-green-700"
              >
                Save & Continue
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

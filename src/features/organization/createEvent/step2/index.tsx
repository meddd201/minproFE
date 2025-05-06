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
import { FC } from "react";

interface StepTwoIDPageProps {
  eventid: string;
}

const StepTwoIDPage: FC<StepTwoIDPageProps> = ({ eventid }) => {
  // ambil data dari event idnya
  const { data: NewData, isPending, error } = useGetOrgDetailEvent(eventid);
  //
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
            {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
            </Dialog> */}
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
                          : `IDR ${ticket.price.toLocaleString()}`}
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
            <div className="flex justify-end pt-4">
              <Button
                disabled={isPending}
                // onClick={handleSaveAll}
                className="bg-green-600 hover:bg-green-700"
              >
                Save & Continue
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default StepTwoIDPage;

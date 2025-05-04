"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateVoucher from "@/hooks/api/events/userCreateVoucher";

type Voucher = {
  name: string;
  quantity: number;
  amountDiscount: number;
  startDate: string;
  endDate: string;
};

const validationSchema = Yup.object({
  name: Yup.string().min(3).required(),
  quantity: Yup.number().min(1).required(),
  amountDiscount: Yup.number().min(0).max(100).required(),
  startDate: Yup.date().required(),
  endDate: Yup.date().required(),
});

export default function CreateVoucherPage() {
  const router = useRouter();
  const { eventid } = useParams();
  const { mutateAsync: createVoucher, isPending } = useCreateVoucher("");

  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 1,
      amountDiscount: 0,
      startDate: "",
      endDate: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (editIndex !== null) {
        const updated = [...vouchers];
        updated[editIndex] = values;
        setVouchers(updated);
        setEditIndex(null);
      } else {
        setVouchers((prev) => [...prev, values]);
      }
      setIsDialogOpen(false);
      formik.resetForm();

      //ini data yang belum kelar
      // const result = await createTicket(values);
      // const eventId = result.data.id; // Assuming the API returns the created ticket ID
      router.push(`/organization/create-event/step3/${eventid}`);
    },
  });

  const handleEdit = (index: number) => {
    formik.setValues(vouchers[index]);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const handleDelete = (index: number) => {
    setVouchers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-2xl font-bold">Create Vouchers for Event</h1>
        <p className="text-muted-foreground">Event ID: {eventid}</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Voucher Types</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Voucher
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editIndex !== null ? "Edit Voucher" : "Add Voucher"}
                  </DialogTitle>
                  <DialogDescription>
                    {editIndex !== null
                      ? "Update voucher details"
                      : "Fill out details to add a voucher"}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Voucher Name</label>
                    <Input
                      name="name"
                      placeholder="Voucher Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">
                      Amount Discount
                    </label>
                    <Input
                      type="number"
                      name="amountDiscount"
                      placeholder="Discount (IDR)"
                      value={formik.values.amountDiscount}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <Input
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                    />
                  </div>
                    <label className="text-sm font-medium">Valid Dates</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      name="startDate"
                      value={formik.values.startDate}
                      onChange={formik.handleChange}
                    />
                    <Input
                      type="date"
                      name="endDate"
                      value={formik.values.endDate}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editIndex !== null ? "Update" : "Add"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Start</TableHead>
                  <TableHead>End</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vouchers.length > 0 ? (
                  vouchers.map((voucher, index) => (
                    <TableRow key={index}>
                      <TableCell>{voucher.name}</TableCell>
                      <TableCell>{`IDR ${voucher.amountDiscount.toLocaleString()}`}</TableCell>
                      <TableCell>{voucher.quantity}</TableCell>
                      <TableCell>{voucher.startDate}</TableCell>
                      <TableCell>{voucher.endDate}</TableCell>
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
                      colSpan={6}
                      className="text-muted-foreground text-center"
                    >
                      No vouchers yet. Click "Add Voucher" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {vouchers.length > 0 && (
            <div className="flex justify-end pt-4">
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={isPending || formik.isValid}
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

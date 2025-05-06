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
import formatRupiah from "@/utils/formatingRupiah";
import { log } from "console";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { FC, useState } from "react";
import VoucherDialog from "./components/StepThreeDialog";
import { format } from "date-fns";
interface StepThreePageProps {
  eventId: string;
}

const StepThreePage: FC<StepThreePageProps> = ({ eventId }) => {
  const { data: NewVoucher, isPending, error } = useGetOrgDetailEvent(eventId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = () => {
    console.log("Voucher added successfully");
    setIsDialogOpen(false);
  };

  if (isPending)
    return <Loading className="container mx-auto h-[100vh] items-center" />;

  if (error) return redirect("/organization");
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text center mb-8">
        <h1 className="mb-6 text-2xl font-bold"> Create Voucher for Event</h1>
        <p className="text-muted-foreground mb-4"> Event ID: {eventId}</p>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Voucher Types</h2>
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={() => setIsDialogOpen(true)}
            >
              Add Voucher
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount Discount</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NewVoucher.data!.eventVoucher!.length > 0 ? (
                  NewVoucher.data!.eventVoucher!.map((voucher, index) => (
                    <TableRow key={index}>
                      <TableCell>{voucher.name}</TableCell>
                      <TableCell>
                        {voucher.amountDiscount === 0
                          ? "Not usable"
                          : `${formatRupiah(voucher.amountDiscount)}`}
                      </TableCell>
                      <TableCell>{voucher.quota}</TableCell>
                      <TableCell>
                        {format(voucher.startDate, "d MMMM yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(voucher.endDate, "d MMMM yyyy")}
                      </TableCell>
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
                      No vouchers yet. Click "Add Voucher" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {NewVoucher.data.eventVoucher &&
            NewVoucher.data.eventVoucher.length > 0 && (
              <Link
                href={`/organization/step3/${eventId}`} //ini seharusnya langsung publishh
                className="flex justify-end pt-4"
              >
                <Button
                  disabled={
                    isPending || NewVoucher.data.eventVoucher.length < 1
                  }
                  // onClick={handleSaveAll}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Save & Publish
                </Button>
              </Link>
            )}
        </CardContent>
      </Card>

      <VoucherDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        eventId={eventId}
      />
    </section>
  );
};

export default StepThreePage;

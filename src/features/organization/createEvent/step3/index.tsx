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
import useDeleteVoucher from "@/hooks/api/voucher/useDeleteVoucher";
import { EventVoucher } from "@/types/eventsVoucher";
import formatRupiah from "@/utils/formatingRupiah";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { FC, useState } from "react";
import CreateVoucherDialog from "./components/StepThreeCreateDialog";
import EditVoucherDialog from "./components/StepThreeEditDialog";
import usePublish from "@/hooks/api/events/usePublish";
interface StepThreePageProps {
  eventId: string;
}

const StepThreePage: FC<StepThreePageProps> = ({ eventId }) => {
  const { data: NewData, isPending, error } = useGetOrgDetailEvent(eventId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { mutateAsync: deleteVoucher, isPending: pendingDelete } =
    useDeleteVoucher(eventId);
  const { mutateAsync: publishEvent, isPending: pendingPublish } =
    usePublish(eventId);
  const router = useRouter();

  const [isDialogEditOpen, setIsDialogEditOpen] = useState(false);
  const [voucherToEdit, setVoucherToEdit] = useState<EventVoucher | null>();
  if (isPending)
    return <Loading className="container mx-auto h-[100vh] items-center" />;

  if (error) return redirect("/organization");

  const handlecloseEditDialog = () => {
    setIsDialogEditOpen(false);
    setVoucherToEdit(null);
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="mb-6 text-2xl font-bold"> Adjust Voucher for Event</h1>

        <div className="gap">
          <p className="text-muted-foreground text-xl">{NewData.data.name}</p>
          <p className="text-muted-foreground"> Event ID: {eventId}</p>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Voucher Types</h2>
            <Button onClick={() => setIsDialogOpen(true)}>Add Voucher</Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Amount Discount</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead>Used</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {NewData.data!.eventVoucher!.length > 0 ? (
                  NewData.data!.eventVoucher!.map((voucher, index) => (
                    <TableRow key={index}>
                      <TableCell>{voucher.name}</TableCell>
                      <TableCell>
                        {voucher.amountDiscount === 0
                          ? "Not usable"
                          : `${formatRupiah(voucher.amountDiscount)}`}
                      </TableCell>
                      <TableCell>{voucher.quota}</TableCell>
                      <TableCell>{voucher.used}</TableCell>
                      <TableCell>
                        {format(voucher.startDate, "d MMMM yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(voucher.endDate, "d MMMM yyyy")}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => {
                              setVoucherToEdit(voucher);
                              setIsDialogEditOpen(true);
                            }}
                            size="sm"
                            variant="ghost"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            disabled={pendingDelete || voucher.used > 0}
                            onClick={() => deleteVoucher(voucher.id)}
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
                      No vouchers yet. Click "Add Voucher" to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between">
            <Button
              disabled={isPending || pendingDelete || pendingPublish}
              onClick={() =>
                router.push(`/organization/create-event/step2/${eventId}`)
              }
            >
              Back
            </Button>
            {NewData.data.status === "DRAFT" ? (
              <div className="flex gap-2">
                <Button
                  variant={"secondary"}
                  disabled={isPending || pendingDelete || pendingPublish}
                  onClick={() => router.push(`/organization/events`)}
                >
                  Save Change
                </Button>

                <Button
                  disabled={isPending || pendingDelete || pendingPublish}
                  onClick={() => publishEvent()}
                >
                  Publish
                </Button>
              </div>
            ) : (
              <Button
                disabled={isPending || pendingDelete}
                onClick={() => router.push(`/organization/events/${eventId}`)}
              >
                Save Change
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <CreateVoucherDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        eventId={eventId}
      />
      {voucherToEdit && (
        <EditVoucherDialog
          isOpen={isDialogEditOpen}
          onClose={handlecloseEditDialog}
          eventId={eventId}
          voucherData={voucherToEdit}
        />
      )}
    </section>
  );
};

export default StepThreePage;

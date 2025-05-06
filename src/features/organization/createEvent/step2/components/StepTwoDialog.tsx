import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import * as Yup from "yup";
import useCreateTicket from "@/hooks/api/events/useCreateTicket";

export type Ticket = {
  name: string;
  price: number;
  amount: number;
};

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: Ticket) => void;
  ticketData?: Ticket;
  eventId: string;
}

const validationSchema = Yup.object({
  name: Yup.string().min(3, "At least 3 characters").required("Required"),
  price: Yup.number().min(0, "Must be positive").required("Required"),
  amount: Yup.number().min(1, "At least 1").required("Required"),
});

const TicketDialog: FC<TicketDialogProps> = ({
  isOpen,
  onClose,
  ticketData,
  eventId,
}) => {
  const {
    mutateAsync: createTicket,
    isPending,
    isSuccess,
  } = useCreateTicket(eventId);

  const formik = useFormik({
    initialValues: {
      name: ticketData?.name || "",
      price: ticketData?.price || 0,
      amount: ticketData?.amount || 1,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await createTicket(values);
      formik.resetForm();
      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ticketData ? "Edit Ticket" : "Add Ticket"}</DialogTitle>
          <DialogDescription>
            {ticketData
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
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
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
              {formik.touched.price && formik.errors.price && (
                <p className="text-sm text-red-500">{formik.errors.price}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">amount</label>
              <Input
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.amount && formik.errors.amount && (
                <p className="text-sm text-red-500">{formik.errors.amount}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formik.isValid || isPending}>
              {isPending ? "Processing..." : ticketData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;

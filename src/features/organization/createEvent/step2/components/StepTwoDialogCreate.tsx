import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useCreateTicket from "@/hooks/api/events/useCreateTicket";
import { useFormik } from "formik";
import { FC } from "react";
import * as Yup from "yup";

interface TicketDialogProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
}

const CreateTicketValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "At least 3 characters")
    .max(20, "ticket name too long")
    .matches(/^[a-zA-Z0-9 ]*$/, "Only alphanumeric characters are allowed")
    .required("Required"),
  price: Yup.number().min(0, "Must be positive").required("Required"),
  amount: Yup.number().min(1, "At least 1").required("Required"),
});

const TicketDialogCreate: FC<TicketDialogProps> = ({
  isOpen,
  onClose,
  eventId,
}) => {
  const { mutateAsync: createTicket, isPending } = useCreateTicket(eventId);
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      amount: 1,
    },
    validationSchema: CreateTicketValidationSchema,
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
          <DialogTitle>{"Add Ticket"}</DialogTitle>
          <DialogDescription>
            Create a new ticket type for your event.
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
              {isPending ? "Processing..." : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialogCreate;

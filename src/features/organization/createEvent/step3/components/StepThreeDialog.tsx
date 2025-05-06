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
import useCreateVoucher from "@/hooks/api/events/useCreateVoucher";
import { CalendarIcon } from "lucide-react";
import { start } from "repl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

export type Voucher = {
  name: string;
  amountDiscount: number;
  quota: number;
  startDate: string;
  endDate: string;
  used: number;
};

interface VoucherDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: Voucher) => void;
  voucherData?: Voucher;
  eventId: string;
}

const validationSchema = Yup.object({
  name: Yup.string().min(3, "At least 3 characters").required("Required"),
  amountDiscount: Yup.number().min(0, "Must be positive").required("Required"),
  quota: Yup.number().min(1, "At least 1").required("Required"),
  startDate: Yup.date().required("Required"),
  endDate: Yup.date().required("Required"),
  used: Yup.number().min(0, "Must be positive").required("Required"),
});

const VoucherDialog: FC<VoucherDialogProps> = ({
  isOpen,
  onClose,
  voucherData,
  eventId,
}) => {
  const {
    mutateAsync: createVoucher,
    isPending,
    isSuccess,
  } = useCreateVoucher(eventId);

  const formik = useFormik({
    initialValues: {
      name: voucherData?.name || "",
      amountDiscount: voucherData?.amountDiscount || 0,
      quota: voucherData?.quota || 1,
      startDate: voucherData?.startDate || "",
      endDate: voucherData?.endDate || "",
      used: voucherData?.used || 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      
      await createVoucher(values);
      formik.resetForm();
      onClose();
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {voucherData ? "Edit Voucher" : "Add Voucher"}
          </DialogTitle>
          <DialogDescription>
            {voucherData
              ? "Update voucher details."
              : "Create a new voucher for your event."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Voucher Name</label>
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
              <label className="text-sm font-medium">
                Amount Discount (IDR)
              </label>
              <Input
                type="number"
                name="amountDiscount"
                value={formik.values.amountDiscount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.amountDiscount &&
                formik.errors.amountDiscount && (
                  <p className="text-sm text-red-500">
                    {formik.errors.amountDiscount}
                  </p>
                )}
            </div>

            <div>
              <label className="text-sm font-medium">Qty</label>
              <Input
                type="number"
                name="quota"
                value={formik.values.quota}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.quota && formik.errors.quota && (
                <p className="text-sm text-red-500">{formik.errors.quota}</p>
              )}
            </div>

            {/* Start Date */}
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="grow space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {formik.values.startDate ? (
                        format(formik.values.startDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.startDate
                          ? new Date(formik.values.startDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("startDate", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {formik.errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {" "}
                    {formik.errors.startDate}
                  </p>
                )}
              </div>

              <div className="grow space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formik.values.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon />
                      {formik.values.endDate ? (
                        format(formik.values.endDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={
                        formik.values.endDate
                          ? new Date(formik.values.endDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        formik.setFieldValue("endDate", date);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formik.isValid || isPending}>
              {isPending ? "Processing..." : voucherData ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VoucherDialog;

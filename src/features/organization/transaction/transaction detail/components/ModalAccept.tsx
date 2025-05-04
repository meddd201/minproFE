"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAcceptTransaction from "@/hooks/api/transactions/useAcceptTransaction";
import { useState } from "react";

const ModalAcceptTransaction = ({
  isOpen,
  onClose,
  reciptNumber,
}: {
  isOpen: boolean;
  onClose: () => void;
  reciptNumber: string;
}) => {
  const { mutateAsync: acceptTransaction, isPending } = useAcceptTransaction();
  const [checkConfirmatin, setChekkConfirmation] = useState(false);
  if (!isOpen) return null;

  const handleAcceptTransaction = async () => {
    acceptTransaction(reciptNumber);
  };

  return (
    <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-80 rounded-lg bg-white p-6 text-center">
        <h2 className="mb-4 text-xl font-semibold">Accept Transaction</h2>
        <div className="mb-4 flex items-center">
          <Input
            type="checkbox"
            id="confirmation"
            className="w-6"
            checked={checkConfirmatin}
            onChange={(e) => setChekkConfirmation(e.target.checked)}
          />
          <Label htmlFor="confirmation" className="text-xs">
            I confirm that I want to accept this transaction.
          </Label>
        </div>
        <div className="flex justify-between gap-3">
          <Button
            disabled={isPending}
            onClick={onClose}
            type="button"
            className="bg-muted grow border text-black hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAcceptTransaction}
            disabled={isPending || !checkConfirmatin}
            className="grow hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalAcceptTransaction;

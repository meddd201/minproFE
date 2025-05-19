"use client";

import { Button } from "@/components/ui/button";
import { IEvent } from "@/types/events";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CreditCard, Minus, Plus, Ticket } from "lucide-react";
import { FC, useState } from "react";
import TicketCard from "./ticket-card";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TicketSelectionProps {
  event: IEvent;
}

const TicketSelection: FC<TicketSelectionProps> = ({ event }) => {
  const [hargatotal, setHargatotal] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState("");
  const [selectedCupon, setSelectedCoupon] = useState<string[]>([]);
  const [ticketQuantities, setTicketQuantities] = useState<Record<string, number>>(
    {}
  );

  const handleQuantityChange = (ticketId: string, quantity: number) => {
    setTicketQuantities((prev) => ({
      ...prev,
      [ticketId]: quantity,
    }));

    // Calculate total price
    const totalPrice = event.tickets?.reduce((acc, ticket) => {
      const qty = ticketId === ticket.id ? quantity : ticketQuantities[ticket.id] || 0;
      return acc + ticket.price * qty;
    }, 0);

    setHargatotal(totalPrice || 0);
  };

  return (
    <Card className="p-6 space-y-6 sticky top-4 bg-gradient-to-b from-yellow-100 to-indigo-100">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Ticket className="w-5 h-5" />
          Select Tickets
        </h3>

        <div className="space-y-4 ">
          {event.tickets?.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket}
              quantity={ticketQuantities[ticket.id] || 0}
              onQuantityChange={(quantity) => handleQuantityChange(ticket.id, quantity)}
            />
          ))}
        </div>

        {/* <div className="space-y-4">
          <Select value={selectedVoucher} onValueChange={setSelectedVoucher}>
            <SelectTrigger>
              <SelectValue placeholder="Select voucher" />
            </SelectTrigger>
            <SelectContent>
              {event.eventVoucher?.map((voucher) => (
                <SelectItem key={voucher.id} value={voucher.id}>
                  {voucher.code} - {voucher.discount}% OFF
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}

        {hargatotal > 0 && (
          <>
            <Separator className="my-4" />
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span>Rp. {hargatotal.toLocaleString()}</span>
              </div>
              {selectedVoucher && (
                <div className="flex items-center justify-between text-sm text-green-600">
                  <span>Discount</span>
                  <span>- Rp. {/* hitung jumlah diskon */}</span>
                </div>
              )}
              <div className="flex items-center justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rp. {hargatotal.toLocaleString()}</span>
              </div>
            </div>

            <Button className="w-full" size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              Proceed to Payment
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};

export default TicketSelection;
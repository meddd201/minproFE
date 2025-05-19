import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";

interface TicketCardProps {
  ticket: ITicket;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
}

const TicketCard: FC<TicketCardProps> = ({ ticket, quantity, onQuantityChange }) => {
  const handleIncrement = () => {
    if (quantity < ticket.amount) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      onQuantityChange(quantity - 1);
    }
  };

  return (
    <Card className="p-4 ">
      <div className="flex items-center justify-between ">
        <div className="space-y-1">
          <h4 className="font-medium">{ticket.name}</h4>
          <p className="text-sm text-gray-500">
            {ticket.amount} tickets available
          </p>
          <p className="font-semibold">
            Rp. {ticket.price.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDecrement}
            disabled={quantity === 0}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-8 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={handleIncrement}
            disabled={quantity === ticket.amount}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TicketCard;
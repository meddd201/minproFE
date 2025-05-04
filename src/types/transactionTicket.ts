import { Ticket } from "./ticket";

export interface TransactionTicket {
  id: string;
  transactionId: string;
  ticketId: string;
  quantity: number;
  price: number;
  createdAt: string;
  deletedAt: string | null;
  tickets?: Ticket;
}

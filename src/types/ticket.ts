import { Event } from "./events";

export interface Ticket {
  id: string;
  eventId: string;
  name: string;
  price: number;
  amount: number;
  buyed: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  events?: Event;
}

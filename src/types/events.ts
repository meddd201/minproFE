import { EventVoucher } from "./eventsVoucher";
import { Ticket } from "./ticket";

export interface IEvent {
  id: string;
  organizerId: string;
  category: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  location: string;
  status: "DRAFT" | "PUBLISHED";
  eventStart: string;
  eventEnd: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  organizers?: {
    id: string;
    name: string;
    organizerPicture: string | null;
  };
  tickets?: ITicket[];
  eventVoucher?: [];
}

export interface Event {
  id: string;
  organizerId: string;
  category: string;
  name: string;
  slug: string;
  image: string | null;
  description: string;
  location: string;
  status: string;
  eventStart: Date;
  eventEnd: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  _count?: {
    tickets: number;
    eventVoucher: number;
  };

  //relation
  organizers?: any;
  eventVoucher?: EventVoucher[];
  tickets?: Ticket[];
  usersEvents?: any;
}

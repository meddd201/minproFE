export interface EventOrganizer {
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
  _count: {
    tickets: number;
    eventVoucher: number;
  };

  //relation
  organizers?: any;
  eventVoucher?: any;
  tickets?: any;
  usersEvents?: any;
}



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
  isFeatured: boolean;
  isFree: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  price?: number;
  rating?: number;
}

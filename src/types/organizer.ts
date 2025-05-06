export interface Organizer {
  id: string;
  userId: string;
  name: string;
  slug: string;
  organizerPicture: string | null;
  description: string;
  bankTarget: string;
  paymentTarget: string;
  updatedAt: Date;
  createdAt: Date;
  deletedAt: Date | null;
}

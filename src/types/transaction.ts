export interface TransactionOverview {
  id: string;
  receiptNumber: string;
  status: string;
  paymentProof: string | null;
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  userId: string;
  username: string;
  email: string;
  profilePict: string | null;
  tickets: {
    ticketName: string;
    quantity: number;
  }[];
  event?: {
    name: string;
  }[];
}

import { CuponTransaction } from "./cuponTransaction";
import { TransactionTicket } from "./transactionTicket";
import { User } from "./user";
import { VoucherTransaction } from "./VoucherTransaction";

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

export interface TransactionDetail {
  id: string;
  reciptNumber: string;
  userId: string;
  status: TransactionStatus;
  pointsUsed: number;
  pointsExpiredAt: Date;
  totalDecreaseDiscount: number;
  totalPercentDiscount: number;
  totalPrice: number;
  paymentDeadline: Date;
  paymentProof?: string;
  organizerDeadline?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  // Relations
  users?: User;
  cuponTransactions?: CuponTransaction[];
  voucherTransaction?: VoucherTransaction[];
  transactionTicket?: TransactionTicket[];
}

export enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  WAITING_FOR_ADMIN_CONFIRMATION = "WAITING_FOR_ADMIN_CONFIRMATION",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

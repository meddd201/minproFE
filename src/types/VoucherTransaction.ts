import { EventVoucher } from "./eventsVoucher";

export interface VoucherTransaction {
  id: string;
  transactionId: string;
  eventVoucherId: string;
  createdAt: Date;
  deleteAt?: Date;
  eventVoucher?: EventVoucher;
}

export interface CuponTransaction {
  id: string;
  transactionId: string;
  cuponDiscountId: string;
  type: "PERCENTAGE" | "FIXED_AMOUNT";
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

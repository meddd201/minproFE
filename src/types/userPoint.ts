export interface UserPoint {
  id: string;
  userId: string;
  amount: number;
  expiredAt: Date;
  updateAt: Date;
  createdAt: Date;
  deletedAt?: Date | null;
}

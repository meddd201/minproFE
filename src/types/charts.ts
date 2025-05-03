export interface TransactionByDate {
    date: string;
    WAITING_FOR_PAYMENT: number;
    WAITING_FOR_ADMIN_CONFIRMATION: number;
    DONE: number;
    REJECTED: number;
    EXPIRED: number;
    CANCELED: number;
}

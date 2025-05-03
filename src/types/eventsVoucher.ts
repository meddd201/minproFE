export interface EventVoucher {
    id: string;
    eventId: string;
    name: string;
    amountDiscount: number;
    quota: number;
    used: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}
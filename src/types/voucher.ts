
  interface IVoucher {
    id: string;
    name: string;
    amountDiscount: number;
    quota: number;
    used: number;
    startDate: Date;
    endDate: Date;
  }
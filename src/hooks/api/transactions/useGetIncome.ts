"use client";

import useAxios from "@/hooks/useAxios";
import { TransactionByDate } from "@/types/charts";
import { useQuery } from "@tanstack/react-query";

interface GetIncomeQuery {
  eventid?: string;
}

interface GetTransEventChartResponse {
  data: {
    totalIncome: number;
    totalIncomeBeforeDiscount: number;
  };
  message: string;
}
const useGetIncome = (queries: GetIncomeQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactionincome", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetTransEventChartResponse>(
        `transactions/income`,
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetIncome;

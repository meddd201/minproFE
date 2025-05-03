"use client";

import useAxios from "@/hooks/useAxios";
import { TransactionByDate } from "@/types/charts";
import { useQuery } from "@tanstack/react-query";

interface GetTransEventChartsQuery {
  datefrom?: string;
}

interface GetTransEventChartResponse {
  data: {
    transactions: TransactionByDate[];
    tickets: TransactionByDate[];
  };
  message: string;
}
const useGetTransEventCharts = (
  eventid: string,
  queries: GetTransEventChartsQuery,
) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactionevent", eventid, queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetTransEventChartResponse>(
        `transactions/chart/${eventid}`,
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetTransEventCharts;

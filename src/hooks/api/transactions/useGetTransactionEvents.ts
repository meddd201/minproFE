"use client";

import useAxios from "@/hooks/useAxios";
import { Attendee } from "@/types/atendee";
import { PageableResponse } from "@/types/pagination";
import { TransactionOverview } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionEventQuery {
  search?: string;
  ticket?: string;
  date?: string;
  page?: number;
  take?: number;
  sortOrder?: string;
}

const useGetTransactionEvents = (
  eventid: string,
  queries: GetTransactionEventQuery,
) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactionevent", eventid, queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<TransactionOverview>
      >(`transactions/${eventid}`, { params: queries });
      return data;
    },
  });
};
export default useGetTransactionEvents;

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
  eventid?: string;
  status?: string;
}

const useGetTransactionEvents = (
  queries: GetTransactionEventQuery,
) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactionevent", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<TransactionOverview>
      >(`transactions/organizer`, { params: queries });
      return data;
    },
  });
};
export default useGetTransactionEvents;

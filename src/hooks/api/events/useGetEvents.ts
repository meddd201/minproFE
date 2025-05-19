"use client";

import type { IEvent } from "@/types/events";
import type { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxios from "@/hooks/useAxios";
import type { PaginationQueries } from "@/types/pagination";

interface GetEventQuery extends PaginationQueries {
  search?: string;
  category?: string;
  location?: string;
  date?: Date | null;
}
const useGetEvents = (queries?: GetEventQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<
        PageableResponse<IEvent>
      >("/events", { params: queries });
      return data;
    },
  });
};
export default useGetEvents;



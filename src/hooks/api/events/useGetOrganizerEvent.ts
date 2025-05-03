"use client";

import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/events";
import type { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetOrganizerEventQuery extends PaginationQueries {
  search?: string;
  category?: string;
  location?: string;
  date?: Date | null;
}
const useGetOrganizerEvent = (queries?: GetOrganizerEventQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEvent", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events/organizer",
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetOrganizerEvent;

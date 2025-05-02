"use client";

import useAxios from "@/hooks/useAxios";
import { EventOrganizer } from "@/types/EventOrganizer";
import type { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

const useGetOrgDetailEvent = (eventid: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEvent", eventid],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<PageableResponse<EventOrganizer>>(
          `/events/organizer/${eventid}`,
        );
      return data;
    },
  });
};
export default useGetOrgDetailEvent;

"use client";

import useAxios from "@/hooks/useAxios";
import { Attendee } from "@/types/atendee";
import { PageableResponse } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetOrgAttEventsQuery {
  search?: string;
  ticket?: string;
  page?: number;
  take?: number;
  sortOrder?: string;
}

const useGetOrgAttEvents = (eventid: string, queries: GetOrgAttEventsQuery) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["attendee", eventid, queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Attendee>>(
        `events/attendees/${eventid}`,
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetOrgAttEvents;

"use client";

import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/events";
import { useQuery } from "@tanstack/react-query";

interface EventResponse {
  data: Event;
  message: string;
}

const useGetOrgDetailEvent = (eventid: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEvent", eventid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<EventResponse>(
        `/events/organizer/${eventid}`,
      );
      return data;
    },
  });
};
export default useGetOrgDetailEvent;

"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetOrgLocEvents = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEventLocations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: string[] }>(
        `events/locations/organizer`,
      );
      return data;
    },
  });
};
export default useGetOrgLocEvents;

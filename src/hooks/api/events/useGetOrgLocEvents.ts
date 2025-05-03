"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface LocationResponse {
  data: string[];
  message: string;
}

const useGetOrgLocEvents = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEventLocations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<LocationResponse>(
        `events/locations/organizer`,
      );
      return data;
    },
  });
};
export default useGetOrgLocEvents;

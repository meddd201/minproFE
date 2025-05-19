"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const useGetUserLocEvents = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerEventLocations"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: string[] }>(
        `events/locations`,
      );
      return data;
    },
  });
};
export default useGetUserLocEvents;
"use client";

import useAxios from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

interface userEventDropdownResponse {
  data: {
    id: string;
    name: string;
    location: string;
    tickets: string[];
  }[];
  message: string;
}
const useEventDropdown = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["eventdropdown"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<userEventDropdownResponse>(
        `events/dropdown-event`,
      );
      return data;
    },
  });
};
export default useEventDropdown;

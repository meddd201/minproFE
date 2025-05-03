"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const useGetCategory = () => {
  return useQuery({
    queryKey: ["EventCategory"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ data: string[] }>(
        `events/categories`,
      );
      return data;
    },
  });
};
export default useGetCategory;

"use client";

import useAxios from "@/hooks/useAxios";
import { Organizer } from "@/types/organizer";
import { UserPoint } from "@/types/userPoint";
import { useQuery } from "@tanstack/react-query";

interface GetUserPointResponse {
  data: UserPoint;
  message: string;
}
const useGetUserPoint = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["userPoint"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<GetUserPointResponse>(`transactions/point`);
      return data;
    },
  });
};
export default useGetUserPoint;

"use client";

import useAxios from "@/hooks/useAxios";
import { Organizer } from "@/types/organizer";
import { useQuery } from "@tanstack/react-query";

interface GetOrgTransDetailResponse {
  data: Organizer;
  message: string;
}
const useGetOrgProfile = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["organizerprofile"],
    queryFn: async () => {
      const { data } =
        await axiosInstance.get<GetOrgTransDetailResponse>(`profile/organizer`);
      return data;
    },
  });
};
export default useGetOrgProfile;

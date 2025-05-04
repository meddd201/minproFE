"use client";

import useAxios from "@/hooks/useAxios";
import { TransactionByDate } from "@/types/charts";
import { TransactionDetail } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetOrgTransDetailResponse {
  data: TransactionDetail;
  message: string;
}
const useGetOrgTransDetail = (receiptNumber: string) => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["orgTransDetail", receiptNumber],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetOrgTransDetailResponse>(
        `transactions/detail/${receiptNumber}`,
      );
      return data;
    },
  });
};
export default useGetOrgTransDetail;

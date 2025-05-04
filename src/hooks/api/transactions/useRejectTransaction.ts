import useAxios from "@/hooks/useAxios";
import { useStoreOrgBack } from "@/stores/orderOrganizerBack";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

const useRejectTransaction = () => {
  const { axiosInstance } = useAxios();
  const { backref } = useStoreOrgBack();
  const router = useRouter();

  return useMutation({
    mutationFn: async (receiptNumber: string) => {
      const { data } = await axiosInstance.post(
        `/transactions/rejecting/${receiptNumber}`,
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Transaction accepted successfully");
      router.push(backref);
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useRejectTransaction;

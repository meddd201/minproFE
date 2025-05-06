import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useDeleteVoucher = (eventId: string) => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (voucherid: string) => {
      const { data } = await axiosInstance.delete(`/vouchers/${voucherid}`);

      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Voucer deleted successfully");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useDeleteVoucher;

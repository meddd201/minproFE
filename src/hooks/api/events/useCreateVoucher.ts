import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateVoucher = (eventId: string) => {
    const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      quota: number;
      amountDiscount: number;
      startDate: Date | string;
      endDate: Date | string;
    }) => {
      const { data } = await axiosInstance.post(
        `/vouchers/${eventId}`,
        payload,
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Create Voucher successful");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      })
      // router.push(`/organization/create-event/step3/${eventId}`);
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreateVoucher;

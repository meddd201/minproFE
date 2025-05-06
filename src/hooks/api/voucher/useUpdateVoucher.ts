"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateVoucherPayload {
  id: string;
  name: string;
  quota: number;
  amountDiscount: number;
  startDate: Date | string;
  endDate: Date | string;
}

const useUpdateVoucher = (eventId: string) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: UpdateVoucherPayload) => {
      const { data } = await axiosInstance.put(`/vouchers/${payload.id}`, {
        name: payload.name,
        quota: payload.quota,
        startDate: payload.startDate,
        endDate: payload.endDate,
        amountDiscount: payload.amountDiscount,
      });
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || " Update Voucher successful");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateVoucher;

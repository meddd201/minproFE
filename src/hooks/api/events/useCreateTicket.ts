"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useCreateTicket = (eventId: string) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      price: number;
      amount: number;
    }) => {
      const { data } = await axiosInstance.post(`/tickets/${eventId}`, payload);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Create Ticket successful");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreateTicket;

"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UpdateTicketPayload {
  name: string;
  price: number;
  amount: number;
  ticketid: string;
}

const useUpdateTicket = (eventId: string) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: UpdateTicketPayload) => {
      const { data } = await axiosInstance.put(`/tickets/${payload.ticketid}`, {
        name: payload.name,
        price: payload.price,
        amount: payload.amount,
      });
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "useUpdateTicket Ticket successful");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateTicket;

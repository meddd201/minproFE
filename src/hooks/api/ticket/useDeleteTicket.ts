import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useDeleteTicket = (eventId:string) => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketid: string) => {
      const { data } = await axiosInstance.delete(`/tickets/${ticketid}`);

      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "ticket deleted successfully");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useDeleteTicket;

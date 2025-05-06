"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const usePublish = (eventId: string) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(`/events/publish/${eventId}`);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Publish successful");
      await queryClient.refetchQueries({
        queryKey: ["organizerEvent", eventId],
      });
      redirect(`/organization/events/${eventId}`);
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default usePublish;

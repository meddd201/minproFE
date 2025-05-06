"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      id?: string | null;
      name: string;
      description: string;
      category: string;
      location: string;
      eventStart: Date | string;
      eventEnd: Date | string;
      eventPict: File | null;
    }) => {
      const formData = new FormData();
      if (payload.id) {
        formData.append("id", payload.id);
      }
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("category", payload.category);
      formData.append("location", payload.location);
      formData.append(
        "eventStart",
        payload.eventStart instanceof Date
          ? payload.eventStart.toISOString()
          : payload.eventStart,
      );
      formData.append(
        "eventEnd",
        payload.eventEnd instanceof Date
          ? payload.eventEnd.toISOString()
          : payload.eventEnd,
      );
      if (payload.eventPict) {
        formData.append("eventPict", payload.eventPict);
      }
      const { data } = await axiosInstance.post(`/events`, formData);
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: ["organizerEvent", data.data.id],
      });
      router.push(`/organization/create-event/step2/${data.data.id}`);
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreateEvent;

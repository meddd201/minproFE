"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description: string;
      category: string;
      location: string;
      eventStart: string;
      eventEnd: string;
      eventPict: File | null;
    }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("category", payload.category);
      formData.append("location", payload.location);
      formData.append("eventStart", payload.eventStart);
      formData.append("eventEnd", payload.eventEnd);
      if (payload.eventPict) {
        formData.append("eventPict", payload.eventPict);
      }
      const { data } = await axiosInstance.post(`/events`, formData);
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Create Event successful");
      // router.push(`/event/${data.eventId}`);
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreateEvent;

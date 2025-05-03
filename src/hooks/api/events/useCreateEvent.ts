"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { toast } from "sonner";

const useCreateEvent = () => {
  const router = useRouter();

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
      formData.append("date", payload.eventStart);
      formData.append("date", payload.eventEnd);
      if (payload.eventPict) {
        formData.append("eventPict", payload.eventPict);
      }
      const { data } = await axiosInstance.post(`/events`, formData);
      return data;
    },

    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useCreateEvent;

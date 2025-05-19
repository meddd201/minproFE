import { notFound } from "next/navigation";
import { cache } from "react";
import { axiosInstance } from "@/lib/axios";
import { IEvent } from "@/types/events";

export const getEventBySlug = cache(async (slug: string) => {
  try {
    const response = await axiosInstance.get<IEvent>(`/events/${slug}`);
    
    if (!response.data) {
      return notFound();
    }
    
    return response.data;
  } catch (error) {
    return notFound();
  }
});
import { axiosInstance } from "@/lib/axios"


export const useGetEvent = async (eventId: string) => {
    // const {data} = await axiosInstance.get<PageableResponse<IEvent>>("/events/tickets");
    const {data} = await axiosInstance.get(`/events/${eventId}`);
    return data
}
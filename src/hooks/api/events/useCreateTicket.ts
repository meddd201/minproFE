import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation"
import { toast } from "sonner";


const userCreateTicket = (eventId: string) => {
    const router = useRouter();
    const {axiosInstance} = useAxios()
    return useMutation({
        mutationFn: async (payload: {
            ticketName: string;
            price: number;
            quantity: number;
        }) => {
            const formData = new FormData();
            formData.append("ticketName", payload.ticketName);
            formData.append("price", payload.price.toString());
            formData.append("quantity", payload.quantity.toString());
            
            const { data } = await axiosInstance.post(`/tickets/${eventId}`, formData);
            return data;
        },
        onSuccess: async (data) => {
            toast.success(data.message || "Create Ticket successful");
            // router.push(`/organization/create-event/step3/${eventId}`);
        },
        onError: (error: AxiosError<{message: string; code: number}>) => {
            toast.error(error.response?.data.message || "Something went wrong");
        }
    })
}

export default userCreateTicket;
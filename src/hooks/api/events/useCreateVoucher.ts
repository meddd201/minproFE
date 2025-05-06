import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation"
import { toast } from "sonner";


const useCreateVoucher = (eventId: string) => {
    const router = useRouter();
    const {axiosInstance} = useAxios()
    return useMutation({
        mutationFn: async (payload: {
            voucherName: string;
            quantity: number;
            amountDiscount: number;
            startDate: string;
            endDate: string;            

        }) => {
            const formData = new FormData();
            formData.append("voucherName", payload.voucherName);
            formData.append("quantity", payload.quantity.toString());
            formData.append("amountDiscount", payload.amountDiscount.toString());
            formData.append("startDate", payload.startDate);
            formData.append("endDate", payload.endDate);
            
            const { data } = await axiosInstance.post(`/vouchers/${eventId}`, formData);
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

export default useCreateVoucher;
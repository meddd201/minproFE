import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// TypeScript interfaces
interface Ticket {
  ticketId: string;
  amount: number;
}

interface CreateTransactionPayload {
  cuponID?: string[];
  voucherID?: string;
  tickets: Ticket[];
  pointsUsed?: number;
}

interface ApiResponse {
  message: string;
  data: {
    id: string;
    reciptNumber: string;
    status: string;
    // other transaction fields
  };
}

const useCreateTransaction = () => {
  const { axiosInstance } = useAxios();
  const router = useRouter();

  return useMutation<
    ApiResponse,
    AxiosError<{ message: string; code: number }>,
    CreateTransactionPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post("/transactions", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Transaction created successfully");
      // redirect if needed
      // router.push("/your-success-page"); // customize this
    },
    onError: (error) => {
      toast.error(
        error.response?.data.message || "Failed to create transaction",
      );
    },
  });
};

export default useCreateTransaction;

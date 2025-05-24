import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

// TypeScript interfaces
interface UploadPaymentProofPayload {
  reciptNumber: string;
  imageTransactionFile: File;
}

interface ApiResponse {
  message: string;
  data: {
    id: string;
    reciptNumber: string;
    status: string;
    paymentProof: string;
    userId: string;
    // Add other transaction fields as needed
  };
}

const useUploadPaymentProof = () => {
  const { axiosInstance } = useAxios();

  return useMutation<ApiResponse, AxiosError<{ message: string; code: number }>, UploadPaymentProofPayload>({
    mutationFn: async ({ reciptNumber, imageTransactionFile }) => {
      const formData = new FormData();
      formData.append('imageTransactionFile', imageTransactionFile);

      const { data } = await axiosInstance.post(
        `/transactions/${reciptNumber}/payment-proof`, // Adjust this endpoint to match your backend route
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Payment proof uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data.message || "Failed to upload payment proof");
    },
  });
};

export default useUploadPaymentProof;
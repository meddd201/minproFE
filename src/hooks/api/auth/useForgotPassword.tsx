import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axiosInstance.post(`/auth/forgot-pass`, {
        email,
      });
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset email sent successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useForgotPassword;

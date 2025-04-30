import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useChangePassword = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (input: { oldPassword: string; newPassword: string }) => {
      const { data } = await axiosInstance.patch(`/auth/update-pass`, input);

      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || " update password successfully ");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useChangePassword;

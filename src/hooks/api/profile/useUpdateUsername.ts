import useAxios from "@/hooks/useAxios";
import { useAuthStore } from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

const useUpdateUsername = () => {
  const { user, onUpdateUser } = useAuthStore();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (username: string) => {
      const { data } = await axiosInstance.patch(`/profile/username`, {
        username,
      });

      return data;
    },
    onSuccess: (data) => {
      onUpdateUser(data.user);
      toast.success(data.message || "Username updated successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateUsername;

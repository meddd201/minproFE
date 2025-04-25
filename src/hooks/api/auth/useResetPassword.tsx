import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useResetPassword = (token: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: { newPassword: string; token: string }) => {
      const { data } = await axiosInstance.patch(
        `/auth/update-pass`,
        {
          newPassword: payload.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        },
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Password reset email sent successfully");
      router.push("/login");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useResetPassword;

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../stores/auth";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();
  const { onAuthSuccess } = useAuthStore();
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post(`/auth/login`, {
        userData: {
          email: payload.email,
          password: payload.password,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      onAuthSuccess(data.userWithoutPassword, data.token);
      toast.success(data.message || "Login successful");
      // router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      console.log(error);
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useLogin;

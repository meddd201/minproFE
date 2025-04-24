import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../stores/auth";

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
      alert("User logged in successfully");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      alert(error.response?.data.message);
    },
  });
};

export default useLogin;

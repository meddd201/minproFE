import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post(`/auth/login`, payload);
      return data;
    },
    onSuccess: async (data) => {

      await signIn("credentials", { ...data, redirect: false });
      toast.success(data.message || "Login successful");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useLogin;

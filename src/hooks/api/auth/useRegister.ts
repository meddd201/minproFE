import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegister = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (
      payload: Omit<User, "id" | "profilePict" | "role" | "referralCode">,
    ) => {
      const { data } = await axiosInstance.post(`/auth/register`, payload);
      return data;
    },
    onSuccess: async (data) => {
      const datatosSignIn = { ...data.user, accessToken: data.accessToken };
      await signIn("credentials", { ...datatosSignIn, redirect: false });
      toast.success(data.message || "Registration successful");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useRegister;

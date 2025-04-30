import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const useUpdateEmail = () => {
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (email: string) => {
      const { data } = await axiosInstance.patch(`/profile/email`, {
        email,
      });

      return data;
    },
    onSuccess: async (data) => {
      const datatosSignIn = { ...data.user, accessToken: data.accessToken };
      await signIn("credentials", { ...datatosSignIn, redirect: false });

      toast.success(data.message || "Username updated successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateEmail;

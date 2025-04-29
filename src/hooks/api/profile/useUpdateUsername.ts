import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const useUpdateUsername = () => {
  const session = useSession();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (username: string) => {
      const { data } = await axiosInstance.patch(`/profile/username`, {
        username,
      });

      return data;
    },
    onSuccess: async(data) => {
      const datatosSignIn = { ...data.user, accessToken: data.accessToken };
      await signIn("credentials", { ...datatosSignIn, redirect: false });

      toast.success(data.message || "Username updated successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useUpdateUsername;

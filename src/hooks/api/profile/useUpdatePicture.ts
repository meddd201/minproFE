import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn, useSession } from "next-auth/react";
import { toast } from "sonner";

const useProfilePicture = () => {
  const session = useSession();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (profilePict: File) => {
      const formData = new FormData();
      formData.append("profilePict", profilePict);
      const { data } = await axiosInstance.patch(
        `/profile/profile-pict`,
        formData,
      );
      return data;
    },
    onSuccess: async(data) => {
      const datatosSignIn = { ...data.user, accessToken: data.accessToken };
      await signIn("credentials", { ...datatosSignIn, redirect: false });
      toast.success(data.message || "Profile picture updated successfully");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useProfilePicture;

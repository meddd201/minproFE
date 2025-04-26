import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../stores/auth";
import { toast } from "sonner";

const useProfilePicture = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post(`/auth/login`, payload);
      return data;
    },
    onSuccess: (data) => {
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useProfilePicture;

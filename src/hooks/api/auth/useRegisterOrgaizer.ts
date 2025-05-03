import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useRegisterOrgaizer = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description: string;
      bankTarget: string;
      paymentTarget: number | string;
      organizerPict: File | null;
    }) => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("description", payload.description);
      formData.append("bankTarget", payload.bankTarget);
      formData.append("paymentTarget", payload.paymentTarget.toString());
      if (payload.organizerPict) {
        formData.append("organizerPict", payload.organizerPict);
      }
      const { data } = await axiosInstance.post(
        `/auth/register-organizer`,
        formData,
      );
      return data;
    },
    onSuccess: async(data) => {
      const datatosSignIn = { ...data.user, accessToken: data.accessToken };
      await signIn("credentials", { ...datatosSignIn, redirect: false });
      toast.success(data.message || "Registration Organizer successful");
      router.push("/");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useRegisterOrgaizer;

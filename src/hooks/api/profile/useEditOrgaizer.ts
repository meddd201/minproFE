import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useEditOrgaizer = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
      const { data } = await axiosInstance.patch(
        `/profile/organizer`,
        formData,
      );
      return data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || "Registration Organizer successful");
      await queryClient.invalidateQueries({ queryKey: ["organizerprofile"] });
      router.push("/organization/profile");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message || "Something went wrong");
    },
  });
};

export default useEditOrgaizer;

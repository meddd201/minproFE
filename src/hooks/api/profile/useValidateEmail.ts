import useAxios from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";

const useValidateEmail = () => {
  const [valid, setValid] = useState<string>("empty");
  const { axiosInstance } = useAxios();
  const [isPending, setPending] = useState(false);

  const validateEmail = async (input: string) => {
    if (input.trim() === "") {
      setValid("empty");
      return;
    }
    setPending(true);
    try {
      await axiosInstance.post(`/profile/validate-email`, {
        email: input,
      });
      setValid("true");
      setPending(false);
    } catch (error) {
      setValid("false");
      setPending(false);
    }
  };

  return { valid, isPending, setValid, validateEmail };
};

export default useValidateEmail;

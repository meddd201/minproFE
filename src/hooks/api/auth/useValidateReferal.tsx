import { useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { tree } from "next/dist/build/templates/app-page";

const useValidateRefferal = () => {
  const [valid, setValid] = useState<string>("empty");
  const [isPending, setPending] = useState(false);

  const validateRefferal = async (input: string) => {
    if (input.trim() === "") {
      setValid("empty");
      return;
    }
    setPending(true);
    try {
      await axiosInstance.post(`/auth/valid-refferal`, { referralCode: input });
      setValid("true");
      setPending(false);
    } catch (error) {
      setValid("false");
      setPending(false);
    }
  };

  return { valid, setValid, validateRefferal };
};

export default useValidateRefferal;

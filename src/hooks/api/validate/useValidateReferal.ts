import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

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
      toast.error("Referral code is not valid");
    }
  };

  return { valid, setValid, validateRefferal };
};

export default useValidateRefferal;

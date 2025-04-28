import useAxios from "@/hooks/useAxios";
import { useState } from "react";
import { toast } from "sonner";

const useValidateOrganizerName = () => {
  const [valid, setValid] = useState<string>("empty");
  const { axiosInstance } = useAxios();
  const [isPending, setPending] = useState(false);

  const validateName = async (input: string) => {
    if (input.trim() === "") {
      setValid("empty");
      return;
    }
    setPending(true);
    try {
      await axiosInstance.post(`/auth/validate-new-organizer-name`, {
        name: input,
      });
      setValid("true");
      setPending(false);
    } catch (error) {
      setValid("false");
      setPending(false);
    }
  };

  return { valid, setValid, validateName };
};

export default useValidateOrganizerName;

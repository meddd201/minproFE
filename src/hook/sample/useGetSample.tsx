import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { setData } from "@/redux/slices/sample";
import { Sample } from "@/types/Sample";
import { useQuery } from "@tanstack/react-query";

const useGetSample = () => {
  const dispatch = useAppDispatch();
  return useQuery({
    queryKey: ["sample"],
    queryFn: async () => {
      const { data: sample } = await axiosInstance.get<Sample[]>("/products");
      dispatch(setData(sample));

      return sample;
    },
  });
};

export default useGetSample;

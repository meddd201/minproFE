"use client";

import useGetUserPoint from "@/hooks/api/profile/useGetUserPoint";
import { format } from "date-fns";
import { CircleDollarSign } from "lucide-react";
import { useSession } from "next-auth/react";

const PointUser = () => {
  const session = useSession();
  const user = session?.data?.user;

  if (!user) return null;
  const { data } = useGetUserPoint();

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex gap-2">
        <CircleDollarSign />
        <p>{data?.data.amount}</p>
      </div>
      <div className="text-xs">
        valid : {` `}
        {data?.data.expiredAt && format(data?.data.expiredAt, "dd / MM /  yy")}
      </div>
    </div>
  );
};

export default PointUser;

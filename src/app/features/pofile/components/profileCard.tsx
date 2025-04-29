import React from "react";
import { useAuthStore } from "../../../../stores/auth";
import { Edit, Edit2, Edit3 } from "lucide-react";
import ModalEditName from "./modalEditName";
import { on } from "events";
import { toast } from "sonner";

const ProfileCard = () => {
  const { user } = useAuthStore();
  const [openName, setOpenName] = React.useState(false);
  const [openEmail, setOpenEmail] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);
  const ContentRow = ({
    label,
    value,
    callback,
  }: {
    label: string;
    value: string | undefined;
    icon?: React.ReactNode;
    callback?: () => void;
  }) => (
    <div className="grid grid-cols-3 items-center gap-2 text-sm font-medium text-gray-700">
      <strong className="flex justify-between">
        {label} <p>:</p>{" "}
      </strong>
      <div className="col-span-2 flex justify-between ">
        <p>{value || "N/A"}</p>
        {callback && <Edit onClick={callback} className="text-blue-500 hover:cursor-pointer" />}
      </div>
    </div>
  );

  return (
    <div className="rounded-lg border bg-white p-4 shadow-md shadow-black/20">
      <h2 className="text-center text-2xl font-bold">User Information</h2>
      <div className="mt-4 flex flex-col gap-2">
        <ContentRow
          label="Name"
          value={user?.username}
          callback={() => setOpenName(true)}
        />
        <ContentRow label="Email" value={user?.email} />
        <ContentRow label="Role" value={user?.role} />
        <ContentRow label="Referral Code" value={user?.referralCode} />
      </div>
      <ModalEditName isOpen={openName} onClose={() => setOpenName(false)} />
    </div>
  );
};

export default ProfileCard;

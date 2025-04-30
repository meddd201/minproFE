"use client";
import { Clipboard, Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import ModalEditName from "./modalEditName";
import { toast } from "sonner";
import ModalEditEmail from "./modalEditEmail";

const ProfileCard = () => {
  const session = useSession();
  const user = session.data?.user;
  const [openName, setOpenName] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success("Referral code copied to clipboard!");
      },
      (err) => {
        toast.error("Could not copy text: ", err);
      },
    );
  };

  const ContentRow = ({
    label,
    value,
    callback,
  }: {
    label: string;
    value: string | undefined;
    callback?: () => void;
  }) => (
    <div className="grid grid-cols-3 items-center gap-2 text-sm font-medium text-gray-700">
      <strong className="flex justify-between">
        {label} <p>:</p>{" "}
      </strong>
      <div className="col-span-2 flex justify-between">
        <p>{value || "N/A"}</p>
        {callback && (
          <Edit
            onClick={callback}
            className="text-blue-500 hover:cursor-pointer hover:text-yellow-500"
          />
        )}
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
        <ContentRow
          label="Email"
          value={user?.email}
          callback={() => setOpenEmail(true)}
        />
        <ContentRow label="Role" value={user?.role} />

        <div className="grid grid-cols-3 items-center gap-2 text-sm font-medium text-gray-700">
          <strong className="flex justify-between">
            Referral Code <p>: </p>
          </strong>
          <div className="col-span-2 flex justify-between">
            <p>{user?.referralCode || "N/A"}</p>
            {user?.referralCode && (
              <Clipboard
                onClick={() => copyToClipboard(user.referralCode)}
                className="text-blue-500 hover:cursor-pointer hover:text-yellow-500"
              />
            )}
          </div>
        </div>
      </div>
      <ModalEditName isOpen={openName} onClose={() => setOpenName(false)} />
      <ModalEditEmail isOpen={openEmail} onClose={() => setOpenEmail(false)} />
    </div>
  );
};

export default ProfileCard;

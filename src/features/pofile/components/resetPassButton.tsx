"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import ModalChangePassword from "./modalChangePassword";

const ChangePassButton = () => {
  const [openPassword, setOpenPassword] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpenPassword(true)}
        className="my-2 w-full rounded-lg border-2 bg-white p-4 text-center text-black shadow-md shadow-black/20 hover:cursor-pointer hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
      >
        Change Password
      </Button>
      <ModalChangePassword
        isOpen={openPassword}
        onClose={() => setOpenPassword(false)}
      />

    </div>
  );
};

export default ChangePassButton;

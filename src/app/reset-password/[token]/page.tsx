import React from "react";
import ResetPasswordPage from "../../../../features/reset-password";

const page = async ({ params }: { params: Promise<{ token: string }> }) => {
  const token = (await params).token;
  return <ResetPasswordPage token={token} />;
};

export default page;

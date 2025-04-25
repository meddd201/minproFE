import { FC } from "react";
import ResetPasswordForm from "./components/ResetPasswordForm";

interface ResetPasswordPageProps {
  token: string;
}
const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ token }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/[.10] bg-[url('/login/g1.svg')] bg-cover bg-center p-6 bg-blend-darken md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;

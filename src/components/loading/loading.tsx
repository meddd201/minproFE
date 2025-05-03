import { cn } from "@/lib/utils";
import { Fan } from "lucide-react";
import React, { FC } from "react";
import LoadText from "./text/loadtext";

interface LoadingProps {
  className: string;
}
const Loading: FC<LoadingProps> = ({ className }) => {
  return (
    <section
      className={cn(
        "flex h-full w-full flex-col items-center justify-center",
        className,
      )}
    >
      <Fan size={100} className="mx-auto animate-spin" />
      <LoadText />
    </section>
  );
};

export default Loading;

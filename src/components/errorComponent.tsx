import Image from "next/image";
import React from "react";

interface ErrorComponentProps {
  message?: string;
  className?: string; // Fixed typo from `clasName` to `className`
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  className,
}) => {
  return (
    <div
      className={`flex-col items-center justify-center text-center ${
        className || ""
      }`}
    >
      <Image
        src="/brokenfan.png"
        alt="Error"
        width={100}
        height={100}
        className="mx-auto aspect-square w-1/2 text-gray-500 md:w-1/4"
      />
      <div className="text-center text-lg font-semibold text-gray-700">
        {message || "Something went wrong"}
      </div>
    </div>
  );
};

export default ErrorComponent;

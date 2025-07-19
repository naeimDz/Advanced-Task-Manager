// components/ui/LoadingSpinner.tsx

import React from "react";
import clsx from "clsx";

export const LoadingSpinner = ({
  size = "md",
  center = true,
}: {
  size?: "sm" | "md" | "lg";
  center?: boolean;
}) => {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
          <div className="min-h-screen flex items-center justify-center">

    <div className={clsx(center && "flex items-center justify-center h-full")}>
      <div className={clsx("relative", sizeMap[size])}>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-30 animate-ping"></div>
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
      </div>
    </div>
      </div>
  );
};

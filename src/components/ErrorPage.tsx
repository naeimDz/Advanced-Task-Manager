// components/ui/ErrorPage.tsx
import React from "react";

export const ErrorPage = ({ message = "حدث خطأ غير متوقع." }: { message?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16 text-center text-gray-600">
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <h2 className="text-lg font-semibold mb-2">أُووبس!</h2>
      <p className="text-sm">{message}</p>
    </div>
  );
};

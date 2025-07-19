// app/dashboard/layout.tsx

import { ProtectedRoute } from "@/components/ProtectedRoute";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

        <ProtectedRoute>
          {children}
        </ProtectedRoute>

  );
}

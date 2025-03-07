import type React from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "OsudPotro - Your Trusted Online Pharmacy",
  description: "Get your medicines delivered at your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />

      <main className="custom-container mx-auto flex-1 px-1 md:px-4 py-6">
        {children}
      </main>
    </div>
  );
}

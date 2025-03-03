import type React from "react";

import Header from "@/components/Header";
import BottomNavigation from "@/components/bottom-navigation";
import { Footer } from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-1 md:px-4 py-6">
        {children}
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}

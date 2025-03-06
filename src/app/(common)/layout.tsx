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
      <main className="">
        {children}
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}

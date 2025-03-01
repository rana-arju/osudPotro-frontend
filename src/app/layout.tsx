import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import BottomNavigation from "@/components/bottom-navigation";
import { Footer } from "@/components/footer";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediShop - Your Trusted Online Pharmacy",
  description: "Get your medicines delivered at your doorstep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-1 md:px-4 py-6">
              {children}
            </main>
            <Footer />
            <BottomNavigation />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

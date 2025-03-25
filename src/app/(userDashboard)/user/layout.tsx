import type React from "react"
import type { Metadata } from "next"
import Header from "@/components/Header"
import { UserDashboardSidebar } from "@/components/user/dashboard-sidebar"

export const metadata: Metadata = {
  title: "OsudPotro - User Dashboard",
  description: "Manage your account, orders, and prescriptions",
}

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex flex-1">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:block w-64 shrink-0 border-r min-h-[calc(100vh-64px)]">
          <UserDashboardSidebar />
        </div>

        {/* Main content area with proper padding */}
        <main className="flex-1 p-4 md:p-6 w-full">{children}</main>
      </div>
    </div>
  )
}


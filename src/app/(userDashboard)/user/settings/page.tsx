import type { Metadata } from "next"
import { MobileSidebar } from "@/components/user/mobile-sidebar"
import SettingsClientPage from "./SettingsClientPage"

export const metadata: Metadata = {
  title: "OsudPotro - Account Settings",
  description: "Manage your account settings and preferences",
}

export default function SettingsPage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Account Settings</h1>
        <MobileSidebar />
      </div>

      <SettingsClientPage />
    </div>
  )
}


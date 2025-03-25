import { Suspense } from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MobileSidebar } from "@/components/user/mobile-sidebar"
import { getMe } from "@/services/AuthService"
import Profile from "@/components/auth/Profile"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "OsudPotro - My Profile",
  description: "View and update your profile information",
}

export const dynamic = "force-dynamic"

export default async function ProfilePage() {
  const res = await getMe()
  const userData = res?.data

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <MobileSidebar />
      </div>

      <Suspense fallback={<ProfileSkeleton />}>
        <Profile userData={userData} />
      </Suspense>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-4 w-64 mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  )
}


"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {  Lock, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function SettingsClientPage() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6">Account Settings</h1>

      <div className="grid gap-6">
  

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Appearance</CardTitle>
            </div>
            <CardDescription>Customize how OsudPotro looks on your device</CardDescription>
          </CardHeader>
          <CardContent>
            <ThemeSelector />
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-row items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Switch id="two-factor" />
            </div>
            <Separator />
            <div>
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Client component for theme selection
function ThemeSelector() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div
        className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 ${
          theme === "light" ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-6 w-6" />
        <span className="text-sm font-medium">Light</span>
      </div>
      <div
        className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 ${
          theme === "dark" ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-6 w-6" />
        <span className="text-sm font-medium">Dark</span>
      </div>
      <div
        className={`border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 ${
          theme === "system" ? "border-primary bg-primary/5" : "border-muted"
        }`}
        onClick={() => setTheme("system")}
      >
        <div className="flex">
          <Sun className="h-6 w-6" />
          <Moon className="h-6 w-6" />
        </div>
        <span className="text-sm font-medium">System</span>
      </div>
    </div>
  )
}


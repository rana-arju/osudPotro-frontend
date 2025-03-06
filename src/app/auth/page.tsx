"use client";

import { useState } from "react";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Register from "@/components/auth/register";
import Login from "@/components/auth/login";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <Card className="w-full md:w-1/2 max-w-md">
          <CardHeader>
            <CardTitle>
              Welcome to <span className="text-primary">OsudPotro</span>
            </CardTitle>
            <CardDescription>
              Sign up or log in to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
              </TabsList>
              <TabsContent value="register">
                <Register />
              </TabsContent>
              <TabsContent value="login">
                <Login />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <div className="w-full md:w-1/2 max-w-md md:max-w-lg invisible md:visible">
          <Image
            src="https://ap-pharmo.myshopify.com/cdn/shop/files/image.png?v=1722827724&width=3000"
            alt="Medicine related image"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-contain w-full h-[400px]"
          />
        </div>
      </div>
    </div>
  );
}

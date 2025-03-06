import React from 'react'
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { loginUser } from '@/services/AuthService';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const router = useRouter();
      const loginForm = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      });
        async function onLoginSubmit(values: LoginFormValues) {
          try {
            const response = await loginUser(values);
         
            if (response?.success) {
              toast.success(response.message);
              router.push("/");
            } else {
              toast.error(response?.message);
            }
          } catch  {
           
            toast.error("Login failed. try again");
          }
        }

  return (
    <Form {...loginForm}>
      <form
        onSubmit={loginForm.handleSubmit(onLoginSubmit)}
        className="space-y-4"
      >
        <FormField
          control={loginForm.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />{" "}
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="********"
                    {...field}
                    className="pl-10"
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />{" "}
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full cursor-pointer">
          Login
        </Button>
      </form>
    </Form>
  );
}

export default Login
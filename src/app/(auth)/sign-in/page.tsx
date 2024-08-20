"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginUserSchema } from "@/schemas/auth";
import { z } from "zod";
import Link from "next/link";
import { loginWithCreds } from "@/actions/auth";
import { useRouter } from "next/navigation";

const Page: React.FC = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof LoginUserSchema>>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginUserSchema>) {
    try {
      await loginWithCreds(values);
      router.replace("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="mx-auto w-[85vw] sm:w-[60vw] md:w-[40vw] xl:w-[30vw]">
        <CardHeader>
          <CardTitle className="text-xl">Log In</CardTitle>
          <CardDescription>
            Enter your information to access you account
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form?.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form?.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {" "}
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        {/* <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot your password?
                      </Link> */}
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have account?{" "}
            <Link className="underline cursor-pointer" href={"/sign-up"}>
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;

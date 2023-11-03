"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { adminLoginSchema } from "@/types/schema";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof adminLoginSchema>>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof adminLoginSchema>) {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
      });

      if (!res?.error) {
        router.replace("/redirector");
      } else {
        setLoginError("Username atau password salah!");
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      {loginError && (
        <Alert
          variant="destructive"
          className={"mb-4"}
        >
          <AlertTitle>Login Gagal!</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type={"password"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={"w-full"}
        >
          Login
        </Button>
        <p className="px-8 text-sm text-center text-muted-foreground">
          Dengan klik &rdquo;Login&rdquo;, anda akan diarahkan ke halaman
          Dashboard Admin/Staff.
        </p>
      </form>
    </Form>
  );
}

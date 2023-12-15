"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { wargaLoginSchema } from "@/types/schema";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WargaLoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof wargaLoginSchema>>({
    resolver: zodResolver(wargaLoginSchema),
    defaultValues: {
      nik: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof wargaLoginSchema>) {
    try {
      const username = values.nik;
      const password = values.password;

      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setLoginError("NIK atau password salah!");
      } else {
        router.push("/warga");
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
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name="nik"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIK</FormLabel>
              <FormControl>
                <Input
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>NIK anda</FormDescription>
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
              <FormDescription>Password anda</FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className={"w-full"}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className={"animate-spin mr-1"} />
          ) : (
            "Login"
          )}
        </Button>
        <p className="px-8 text-sm text-center text-muted-foreground">
          Dengan klik &rdquo;Login&rdquo;, anda akan diarahkan ke halaman
          Dashboard pengaduan.
        </p>
      </form>
    </Form>
  );
}

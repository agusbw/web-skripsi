"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { registerUserSchema } from "@/types/types";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export function RegistrationForm() {
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof registerUserSchema>>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerUserSchema>) {
    console.log(values);
    startTransition(async () => {
      const res = await fetch("/api/v1/users", {
        body: JSON.stringify(values),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      toast({
        title: data.success ? "Akun berhasil dibuat" : "Akun gagal dibuat",
        description: data.message,
        variant: data.success ? "default" : "destructive",
      });

      if (data.success) {
        form.reset();
        await signIn("credentials", {
          username: values.username,
          password: values.password,
          redirect: false,
        });
        router.refresh();
        router.push("/redirector");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <div className={"w-full"}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    autoComplete={"off"}
                    placeholder="pakjon01"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Ini adalah username yang akan digunakan untuk login.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={" w-full"}>
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
                <FormDescription>
                  Ini adalah password yang akan digunakan untuk login.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={" w-full"}>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konfirmasi Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type={"password"}
                  />
                </FormControl>
                <FormDescription>
                  Ketik ulang password yang telah anda masukkan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={form.formState.isSubmitting}
          type="submit"
          className={"col-span-2 max-w-fit px-8 ml-auto"}
        >
          {pending ? <Loader2 className={"animate-spin"} /> : null}
          Buat Akun
        </Button>
      </form>
    </Form>
  );
}

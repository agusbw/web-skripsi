"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { wargaLoginSchema } from "@/types/schema";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WargaLoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof wargaLoginSchema>>({
    resolver: zodResolver(wargaLoginSchema),
    defaultValues: {
      nik: ""
    }
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof wargaLoginSchema>) {
    try {
      const username = values.nik;
      const password = format(values.tanggal_lahir, "ddMMyyyy");

      const res = await signIn("credentials", {
        username,
        password,
        redirect: false
      });

      if (res?.error) {
        setLoginError("NIK atau tanggal lahir salah!");
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
          name="tanggal_lahir"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tanggal Lahir</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                      <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
          Dashboard pengaduan.
        </p>
      </form>
    </Form>
  );
}

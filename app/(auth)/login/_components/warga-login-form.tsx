"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { HelpCircle, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { wargaLoginSchema } from "@/types/schema";
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";
import Link from "next/link";
import { ADMIN_WHATSAPP_NUMBER, WHATSAPP_TEXT } from "@/lib/constant";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";

export function RenderPasswordInfoDrawerDialog() {
  const [open, setOpen] = useState(false);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  if (!isSmallDevice) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button variant="outline">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Informasi</DialogTitle>
            <DialogDescription>
              Password bawaan adalah tanggal lahir anda dengan format
              (ddmmyyyy). Contoh: 01111997 untuk tanggal lahir 1 November 1997.
              <p className="text-destructive mt-2">
                Disarankan untuk mengganti password anda setelah login pertama
                kali di halaman biodata.
              </p>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={setOpen}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Informasi</DrawerTitle>
          <DrawerDescription>
            Password bawaan adalah tanggal lahir anda dengan format (ddmmyyyy).
            Contoh: 01111997 untuk tanggal lahir 1 November 1997.
            <p className="text-destructive mt-2">
              Disarankan untuk mengganti password anda setelah login pertama
              kali di halaman biodata.
            </p>
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Tutup</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

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
    const checkuser = await fetch(`/api/check-user/${values.nik}`);

    if (!checkuser.ok) {
      setLoginError("NIK belum terdaftar!");
      return;
    }

    try {
      const res = await signIn("credentials", {
        username: values.nik,
        password: values.password,
        role: "WARGA",
        redirect: false,
      });

      if (res?.error) {
        setLoginError("Password salah!");
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
                <div className="flex gap-3 items-end">
                  <Input
                    type={"password"}
                    {...field}
                  />
                  <RenderPasswordInfoDrawerDialog />
                </div>
              </FormControl>
              <FormDescription>Password anda</FormDescription>
              <FormMessage />
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
        <div className="flex flex-col">
          <Link
            href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT.lupaPassword}`}
            className="hover:underline text-primary text-sm inline-block"
            target="_blank"
            rel="noreferrer noopener"
          >
            Lupa kata sandi?
          </Link>
          <Link
            href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT.daftarAkun}`}
            className="hover:underline text-primary text-sm inline-block"
            rel="noreferrer noopener"
          >
            NIK belum terdaftar?
          </Link>
        </div>
      </form>
    </Form>
  );
}

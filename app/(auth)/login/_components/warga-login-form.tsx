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
import { useRouter } from "next/navigation";

function RenderPasswordInfoDrawerDialog() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      >
        <DialogTrigger
          className="hidden sm:block"
          asChild
        >
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
              <span className="text-destructive mt-2 block">
                Disarankan untuk mengganti password anda setelah login pertama
                kali di halaman biodata.
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Drawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
      >
        <DrawerTrigger
          asChild
          className="block sm:hidden"
        >
          <Button variant="outline">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>Informasi</DrawerTitle>
            <DrawerDescription>
              Password bawaan adalah tanggal lahir anda dengan format
              (ddmmyyyy). Contoh: 01111997 untuk tanggal lahir 1 November 1997.
              <span className="text-destructive mt-2 block">
                Disarankan untuk mengganti password anda setelah login pertama
                kali di halaman biodata.
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Tutup</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function WargaLoginForm() {
  const [loginError, setLoginError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof wargaLoginSchema>>({
    resolver: zodResolver(wargaLoginSchema),
    defaultValues: {
      nik: "",
      password: "",
    },
  });

  const router = useRouter();

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof wargaLoginSchema>) {
    const checkuser = await fetch(`/api/check-user/${values.nik}`);

    if (!checkuser.ok) {
      setLoginError("Username tidak terdaftar.");
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
        setLoginError("Password salah.");
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
          className={"mb-4 bg-red-500/10 text-red-600 border border-red-500/20"}
        >
          <AlertTitle>Login Gagal</AlertTitle>
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
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  autoComplete={"off"}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-xs">
                Masukkan NIK sebagai username bawaan apabila anda belum pernah
                mengubah username.
              </FormDescription>
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
              <FormDescription className="text-xs">
                Klik tanda [?] untuk informasi tentang password.
              </FormDescription>
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
            Lupa password?
          </Link>
          <Link
            href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT.daftarAkun}`}
            className="hover:underline text-primary text-sm inline-block"
            rel="noreferrer noopener"
          >
            NIK belum terdaftar?
          </Link>
          <Link
            href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${WHATSAPP_TEXT.lupaUsername}`}
            className="hover:underline text-primary text-sm inline-block"
            rel="noreferrer noopener"
          >
            Lupa username?
          </Link>
        </div>
      </form>
    </Form>
  );
}

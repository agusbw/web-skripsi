"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { changePasswordSchema } from "@/types/schema";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { changePassword } from "@/lib/server/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ChangePasswordButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
  });

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    startTransition(async () => {
      const result = await changePassword(values);

      if (result.success) {
        toast.success("Sukses", {
          description: result.message,
        });
      } else {
        toast.error("Gagal", {
          description: result.message,
        });
      }

      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <Dialog
        open={dialogOpen}
        onOpenChange={() => {
          setDialogOpen((prev) => !prev);
          form.reset();
        }}
      >
        <Button
          variant={"destructive"}
          asChild
        >
          <DialogTrigger>Ganti Password</DialogTrigger>
        </Button>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Form Ganti Password</DialogTitle>
              <DialogDescription>Lengkapi form dibawah ini!</DialogDescription>
            </DialogHeader>
            <div
              className={
                "flex flex-col gap-y-3 mt-4 max-h-[500px] overflow-auto px-2 py-2"
              }
            >
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password Lama{" "}
                      <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Password Baru{" "}
                      <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Konfirmasi Password Baru{" "}
                      <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className={"text-sm text-muted-foreground mb-4 mt-2"}>
              <span className={"text-destructive"}>*</span>: wajib diisi/dipilih
            </p>
            <DialogFooter>
              <Button
                disabled={pending || form.formState.isSubmitting}
                type="submit"
                className="w-full"
                variant={"destructive"}
              >
                {form.formState.isSubmitting || pending ? (
                  <Loader2 className={"animate-spin mr-1"} />
                ) : (
                  "Ganti Password"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

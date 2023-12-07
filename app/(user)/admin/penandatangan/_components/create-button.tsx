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
import { createPenandatanganSchema } from "@/types/schema";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { createPenandatangan } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export default function CraetePenandatanganButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createPenandatanganSchema>>({
    resolver: zodResolver(createPenandatanganSchema),
    defaultValues: {
      alamat: "",
      jabatan: "",
      nama: "",
    },
  });

  function onSubmit(values: z.infer<typeof createPenandatanganSchema>) {
    startTransition(async () => {
      const result = await createPenandatangan(values);
      toast({
        title: `${result.success ? "Berhasil✅" : "Gagal❌"}!`,
        description: result.message,
        variant: `${result.success ? "default" : "destructive"}`,
      });

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
        <Button asChild>
          <DialogTrigger>Tambah Penandatangan</DialogTrigger>
        </Button>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Form Tambah Penandatangan</DialogTitle>
              <DialogDescription>Lengkapi form dibawah ini!</DialogDescription>
            </DialogHeader>
            <div
              className={
                "flex flex-col gap-y-3 mt-4 mb-5 max-h-[500px] overflow-auto px-2 py-2"
              }
            >
              <FormField
                control={form.control}
                name="nama"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nama <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Jabatan <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Alamat <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className={"text-sm text-muted-foreground"}>
              <span className={"text-destructive"}>*</span>: wajib diisi/dipilih
            </p>
            <DialogFooter>
              <Button
                disabled={pending || form.formState.isSubmitting}
                type="submit"
              >
                {form.formState.isSubmitting || pending ? (
                  <Loader2 className={"animate-spin mr-1"} />
                ) : (
                  "Tambah Data"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

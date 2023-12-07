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
import { useEffect, useState, useTransition } from "react";
import { updatePenandatangan } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { FileIcon, Loader2 } from "lucide-react";
import { type Penandatangan } from "@prisma/client";

export default function UpdatePenandatanganButton({
  penandatangan,
}: {
  penandatangan: Penandatangan;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createPenandatanganSchema>>({
    resolver: zodResolver(createPenandatanganSchema),
  });

  useEffect(() => {
    form.reset();
    form.setValue("nama", penandatangan.nama);
    form.setValue("jabatan", penandatangan.jabatan);
    form.setValue("alamat", penandatangan.alamat);
  }, [form, dialogOpen, penandatangan]);

  function onSubmit(values: z.infer<typeof createPenandatanganSchema>) {
    startTransition(async () => {
      const result = await updatePenandatangan(penandatangan.id, values);
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
        <Button
          variant={"outline"}
          size={"sm"}
          asChild
        >
          <DialogTrigger>
            <FileIcon className="w-4 h-4" />
          </DialogTrigger>
        </Button>
        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Form Ubah Penandatangan</DialogTitle>
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
                  "Ubah Data"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

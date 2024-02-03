"use client";

import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { createNomorSuratSchema } from "@/types/schema";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import * as React from "react";
import { createNomorSurat } from "@/lib/server/actions";

export default function NomorSuratButton({
  suratId,
  noSurat,
}: {
  suratId: string;
  noSurat: string | null;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createNomorSuratSchema>>({
    resolver: zodResolver(createNomorSuratSchema),
    defaultValues: {
      no_surat: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createNomorSuratSchema>) {
    startTransition(async () => {
      const res = await createNomorSurat(suratId, values);

      if (res.success) {
        toast.success("Sukses", {
          description: res.message,
        });
      } else {
        toast.error("Gagal", {
          description: res.message,
        });
      }
      setDialogOpen(false);
    });
  }

  return (
    <Form {...form}>
      <Dialog
        open={dialogOpen}
        onOpenChange={() => setDialogOpen(!dialogOpen)}
      >
        <Button
          onClick={() => setDialogOpen(true)}
          variant={"secondary"}
        >
          {noSurat ? "Ubah Nomor" : "Beri Nomor"}
        </Button>

        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="no_surat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Surat</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Nomor resmi surat yang akan dikeluarkan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button
                type="submit"
                size={"sm"}
                disabled={form.formState.isSubmitting || pending}
              >
                {(form.formState.isSubmitting || pending) && (
                  <Loader2 className={"animate-spin mr-1"} />
                )}
                {noSurat ? "Ubah Nomor" : "Beri Nomor"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

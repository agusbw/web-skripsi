"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { tolakSuratSchema } from "@/types/schema";
import { useTransition } from "react";
import { CircleOff, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import * as React from "react";
import { tolakSurat } from "@/lib/server/actions";

export default function TolakButton({ suratId }: { suratId: string }) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof tolakSuratSchema>>({
    resolver: zodResolver(tolakSuratSchema),
    defaultValues: {
      pesan_penolakan: "",
    },
  });

  async function onSubmit(values: z.infer<typeof tolakSuratSchema>) {
    startTransition(async () => {
      const res = await tolakSurat(suratId, values);

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
          variant={"destructive"}
        >
          <CircleOff className="w-4 h-4 mr-1" /> | Tolak
        </Button>

        <DialogContent onInteractOutside={(e) => e.preventDefault()}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Tolak Pengajuan</DialogTitle>
              <DialogDescription>Berikan alasan penolakan!</DialogDescription>
            </DialogHeader>
            <FormField
              control={form.control}
              name="pesan_penolakan"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Anda dapat memberikan pesan penolakan disini"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-3">
              <Button
                type="submit"
                variant={"destructive"}
                size={"sm"}
                disabled={form.formState.isSubmitting || pending}
              >
                {(form.formState.isSubmitting || pending) && (
                  <Loader2 className={"animate-spin mr-1"} />
                )}
                Tolak Pengajuan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

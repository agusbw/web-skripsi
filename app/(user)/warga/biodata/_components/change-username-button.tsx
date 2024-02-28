"use client";

import { type z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
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
import { changeUsernameSchema } from "@/types/schema";
import { Input } from "@/components/ui/input";
import { useState, useTransition } from "react";
import { changeUsername } from "@/lib/server/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function ChangeUsernameButton() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof changeUsernameSchema>>({
    resolver: zodResolver(changeUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof changeUsernameSchema>) {
    startTransition(async () => {
      const result = await changeUsername(values);

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
        <Button asChild>
          <DialogTrigger>Ganti Username</DialogTrigger>
        </Button>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Form Ganti Username</DialogTitle>
            </DialogHeader>
            <div className={"mt-4 max-h-[500px] overflow-auto px-2 py-2"}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username baru
                      <span className={"text-destructive"}>*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
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
              >
                {form.formState.isSubmitting || pending ? (
                  <Loader2 className={"animate-spin mr-1"} />
                ) : (
                  "Ganti Username"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

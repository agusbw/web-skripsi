"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type * as z from "zod";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { createSkbpkSchema } from "@/types/schema";
import { createSkbpk } from "@/lib/server/actions";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const KEPERLUAN = [
  {
    value: "Untuk melengkapi administrasi kependudukan",
  },
] as const;

export default function SkbpkForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof createSkbpkSchema>>({
    resolver: zodResolver(createSkbpkSchema),
    defaultValues: {
      keperluan: "",
    },
  });

  function onSubmit(values: z.infer<typeof createSkbpkSchema>) {
    startTransition(async () => {
      const result = await createSkbpk(values);

      if (!result.success) {
        toast.error("Gagal", {
          description: result.message,
        });
      }
      if (result.success) {
        toast.success("Sukses", {
          description: result.message,
        });
        router.push("/warga/riwayat");
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="keperluan"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Keperluan Pengajuan
                    </FormLabel>
                    <FormDescription>
                      Tambahkan keperluan pengajuan surat
                    </FormDescription>
                  </div>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {KEPERLUAN.map((item, index) => (
                        <FormItem
                          className="flex items-center space-x-3 space-y-0"
                          key={index}
                        >
                          <FormControl>
                            <RadioGroupItem value={item.value} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.value}
                          </FormLabel>
                        </FormItem>
                      ))}

                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="" />
                        </FormControl>
                        <FormLabel className="font-normal">Lainnya</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keperluan"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Masukkan keperluan anda"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan keperluan anda apabila tidak ada pada pilihan.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            size={"sm"}
            type="submit"
            disabled={form.formState.isSubmitting || pending}
          >
            {form.formState.isSubmitting ||
              (pending && <Loader2 className={"animate-spin mr-1"} />)}
            Kirim Pengajuan Surat
          </Button>
        </form>
      </Form>
    </>
  );
}

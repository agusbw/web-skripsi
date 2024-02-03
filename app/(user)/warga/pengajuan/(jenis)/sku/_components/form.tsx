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
import { createSkuSchema } from "@/types/schema";
import { createSku, uploadFiles } from "@/lib/actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const KEPERLUAN = [
  {
    value: "Untuk melengkapi administrasi kredit",
  },
  {
    value:
      "Untuk melengkapi administrasi permohonan izin pangkalan tabung gas elpiji 3 Kg",
  },
  {
    value: "Untuk melengkapi administrasi kependudukan",
  },
] as const;

export default function SktmForm() {
  const [pending, startTransition] = useTransition();
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false);
  const router = useRouter();
  let example_nama = [
    "Warung Kelontong",
    "Dagang Gas Elpiji 3 Kg",
    "Jual Beli Hasil Bumi",
    "Ternak Ayam",
    "Dagang",
    "Toko Bangunan",
  ];

  const form = useForm<z.infer<typeof createSkuSchema>>({
    resolver: zodResolver(createSkuSchema),
    defaultValues: {
      keperluan: "",
      nama_usaha: "",
      lokasi_usaha: "",
      foto_usaha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createSkuSchema>) {
    const formData = new FormData();
    formData.append("files", values.foto_usaha[0] as Blob);

    startTransition(async () => {
      const uploadRes = await uploadFiles(formData);

      if (uploadRes[0]?.error ?? !uploadRes[0]?.data?.url) {
        toast.error("Gagal", {
          description:
            "Terjadi kesalahan upload gambar, gagal mengajukan surat",
        });
        return;
      }

      const result = await createSku({
        ...values,
        foto_usaha: uploadRes[0].data.url,
      });

      if (!result.success) {
        toast.error("Gagal", {
          description: result.message,
        });
      }
      if (result.success) {
        toast.success("Berhasil", {
          description: result.message,
        });
        router.push("/warga/riwayat");
      }
    });
  }

  const watchNamaUsaha = form.watch("nama_usaha");

  example_nama = example_nama.filter((nama) =>
    nama.toLowerCase().includes(watchNamaUsaha.toLowerCase())
  );

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          encType="multipart/form-data"
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

          <div className="space-y-4 max-w-sm">
            <div>
              <FormLabel className="text-base">Data Pendukung</FormLabel>
              <FormDescription>
                Tambahkan data pendukung pengajuan surat
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="nama_usaha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Usaha</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="Warung Kelontong"
                      {...field}
                      onFocus={() => setIsScrollbarVisible(true)}
                      onBlur={() => {
                        setTimeout(() => setIsScrollbarVisible(false), 200);
                      }}
                    />
                  </FormControl>
                  {isScrollbarVisible && example_nama.length > 0 && (
                    <ScrollArea className="w-full max-h-40 overflow-auto rounded-md border">
                      <div>
                        {example_nama.map((tag) => (
                          <div key={tag}>
                            <div
                              className="text-sm hover:bg-gray-100 cursor-pointer px-4 py-2"
                              onClick={() => {
                                form.setValue("nama_usaha", tag);
                                setIsScrollbarVisible(false);
                              }}
                            >
                              {tag}
                            </div>
                            <Separator />
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                  <FormDescription>
                    Masukkan jenis usaha anda, contohnya: Warung Kelontong, Jual
                    Beli Hasil Bumi, Ternak Ayam, dll.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lokasi_usaha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lokasi Usaha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Banjar Dinas Pelapuan, Desa Pelapuan, Kec. Busungbiu, Kab. Buleleng"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan lokasi usaha anda, contohnya: Banjar Dinas
                    Bonagung, Desa Pelapuan, Kec. Busungbiu, Kab. Buleleng
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto_usaha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foto Usaha</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value?.fileName}
                      onChange={(event) => {
                        field.onChange(event.target.files);
                      }}
                      type="file"
                      accept="image/*"
                    />
                  </FormControl>
                  <FormDescription>
                    Masukkan foto bukti kepemilikan usaha anda (Ukuran maksimal
                    5MB)
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

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
import { Input } from "@/components/ui/input";
import type { z } from "zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { formatEnumValue } from "@/lib/utils";
import { createWargaSchema } from "@/types/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { CalendarIcon, FileEdit, Loader2 } from "lucide-react";
import { AgamaValues, StatusKawinValues } from "@/types/types";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createWarga, updateWarga } from "@/lib/server/actions";
import { ScrollBar, ScrollArea } from "@/components/ui/scroll-area";
import type { Warga } from "@prisma/client";

type CreateWargaForm = Omit<Warga, "createdAt" | "updatedAt" | "id_user">;

export default function CreataWarga({
  children,
  warga = null,
  variant = "default",
  size = "sm",
}: {
  warga?: CreateWargaForm | null;
  children?: React.ReactNode;
  variant:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "link"
    | "ghost";
  size?: "sm" | "lg" | "icon" | "default" | null | undefined;
}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createWargaSchema>>({
    resolver: zodResolver(createWargaSchema),
  });

  React.useEffect(() => {
    form.reset();
    form.setValue("nik", warga ? warga.nik : "");
    form.setValue("kewarganegaraan", warga ? warga.kewarganegaraan : "");
    form.setValue("alamat", warga ? warga.alamat : "");
    form.setValue("nama", warga ? warga.nama : "");
    form.setValue("pekerjaan", warga?.pekerjaan ? warga.pekerjaan : "");
    form.setValue("tempat_lahir", warga ? warga.tempat_lahir : "");
    form.setValue("no_kk", warga ? warga.no_kk : "");

    if (warga) {
      form.setValue("tanggal_lahir", new Date(warga.tanggal_lahir));
      form.setValue("agama", warga.agama);
      form.setValue("jenis_kelamin", warga.jenis_kelamin ? "true" : "false");
      form.setValue("status_perkawinan", warga.status_perkawinan);
    }
  }, [form, dialogOpen, warga]);

  async function onSubmit(values: z.infer<typeof createWargaSchema>) {
    startTransition(async () => {
      const result = warga
        ? await updateWarga(warga.id, values)
        : await createWarga(values);

      if (result.success) {
        toast.success("Sukses", {
          description: result.message,
        });
      }

      if (!result.success) {
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
        onOpenChange={() => setDialogOpen(!dialogOpen)}
      >
        {warga ? (
          <Button
            onClick={() => setDialogOpen(true)}
            variant={variant}
            size={size}
          >
            {children ? children : <FileEdit className="w-4 h-4" />}
          </Button>
        ) : (
          <Button
            onClick={() => setDialogOpen(true)}
            variant={variant}
          >
            {children ? children : "Tambah Warga"}
          </Button>
        )}
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <form
            encType={"multipart/form-data"}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <DialogHeader>
              <DialogTitle>
                Form {warga ? "Update" : "Tambah"} Warga
              </DialogTitle>
              <DialogDescription>Lengkapi form dibawah ini!</DialogDescription>
            </DialogHeader>
            <ScrollArea
              className="h-[500px] my-5"
              type="always"
            >
              <div className={"flex flex-col gap-y-3 mr-4"}>
                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        NIK <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="5108030XXXXXXXXX"
                          autoComplete="off"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="no_kk"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nomor Kartu Keluarga{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="5108030XXXXXXXXX"
                          autoComplete="off"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nama Lengkap{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nyoman xxx"
                          autoComplete="off"
                          {...field}
                        />
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
                        <Input
                          placeholder="Banjar Dinas Pelapuan, Desa Pelapuan, Kec. Busungbiu, Kab. Buleleng"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full gap-3">
                  <FormField
                    control={form.control}
                    name="agama"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Agama <span className={"text-destructive"}>*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih Agama" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {AgamaValues.map((agama) => (
                              <SelectItem
                                key={agama}
                                value={agama}
                              >
                                {formatEnumValue(agama)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="pekerjaan"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Pekerjaan</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Pelajar"
                            autoComplete="off"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="tempat_lahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Tempat Lahir{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Pelapuan"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tanggal_lahir"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        Tanggal Lahir{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                " pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pilih tanggal</span>
                              )}
                              <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            captionLayout="dropdown-buttons"
                            fromYear={1900}
                            toYear={new Date().getFullYear()}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kewarganegaraan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Kewarganegaraan{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Indonesia"
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jenis_kelamin"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        Jenis Kelamin{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field?.value?.toString()}
                          className="flex gap-3"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="true" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Laki-Laki
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="false" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Perempuan
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status_perkawinan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Status Perkawinan{" "}
                        <span className={"text-destructive"}>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih Status Perkawinan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {StatusKawinValues.map((status) => (
                            <SelectItem
                              key={status}
                              value={status}
                            >
                              {formatEnumValue(status)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <p className={"text-sm text-muted-foreground"}>
              <span className={"text-destructive"}>*</span>: wajib diisi/dipilih
            </p>
            <DialogFooter>
              <Button
                type="submit"
                disabled={form.formState.isSubmitting || pending}
              >
                {(form.formState.isSubmitting || pending) && (
                  <Loader2 className={"animate-spin mr-1"} />
                )}
                {warga ? "Update" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
}

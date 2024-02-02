"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { selesaikanSurat } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function SelesaiButton({
  suratId,
  noSurat,
}: {
  suratId: string;
  noSurat: string | null;
}) {
  const [alertOpen, setAlertOpen] = React.useState<boolean | undefined>(false);
  const [pending, startTransition] = React.useTransition();

  async function handleDeleteWarga(id: string) {
    startTransition(async () => {
      const result = await selesaikanSurat(id);
      if (result.success) {
        toast.success("Sukses", {
          description: result.message,
        });
      } else {
        toast.error("Gagal", {
          description: result.message,
        });
      }
      setAlertOpen(false);
    });
  }

  return (
    <AlertDialog open={alertOpen}>
      <Button
        onClick={() => {
          if (!noSurat) {
            toast.error("Harap isi nomor surat terlebih dahulu");
          } else {
            setAlertOpen(true);
          }
        }}
      >
        Selesaikan Surat
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Selesaikan Pengajuan Surat?</AlertDialogTitle>
          <AlertDialogDescription>
            Pengajuan surat akan ditandai sebagai selesai dan surat dapat
            diambil oleh warga.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            onClick={() => setAlertOpen(false)}
            disabled={pending}
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={pending}
            onClick={() => handleDeleteWarga(suratId)}
            className="mb-2 sm:mb-0"
          >
            {pending ? <Loader2 className={"animate-spin mr-1"} /> : null}
            Selesaikan
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import { ambilSurat } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DiambilButton({
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
      const result = await ambilSurat(id);
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
        Surat Diambil
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Surat Telah Diambil Warga?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin surat dengan nomor{" "}
            <span className="font-medium text-foreground">{noSurat}</span> telah
            diambil?
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
          >
            {pending ? <Loader2 className={"animate-spin mr-1"} /> : null}
            Yakin
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
import { Trash2Icon } from "lucide-react";
import { deleteWarga } from "@/lib/actions";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const DeleteWarga = ({ id }: { id: string }) => {
  const [alertOpen, setAlertOpen] = React.useState<boolean | undefined>(false);
  const [pending, startTransition] = React.useTransition();
  const { toast } = useToast();

  async function handleDeleteWarga(id: string) {
    startTransition(async () => {
      const result = await deleteWarga(id);
      toast({
        title: `${result.success ? "Berhasil✅" : "Gagal❌"}!`,
        description: result.message,
        variant: `${result.success ? "default" : "destructive"}`,
      });
      setAlertOpen(false);
    });
  }

  return (
    <AlertDialog open={alertOpen}>
      <Button
        onClick={() => setAlertOpen(true)}
        size={"sm"}
        variant={"destructive"}
      >
        <Trash2Icon className="w-4 h-4" />
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Data Warga?</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah Anda yakin ingin melanjutkan tindakan ini? Tindakan ini tidak
            dapat dibatalkan dan data akan hilang selamanya.
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
            variant={"destructive"}
            type="submit"
            disabled={pending}
            onClick={() => handleDeleteWarga(id)}
          >
            {pending ? <Loader2 className={"animate-spin mr-1"} /> : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

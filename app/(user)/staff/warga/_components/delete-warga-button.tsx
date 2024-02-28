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
import { deleteWarga } from "@/lib/server/actions";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const DeleteWarga = ({
  userId,
  children,
  size = "sm",
}: {
  userId: string;
  children?: React.ReactNode;
  size?: "sm" | "lg" | "icon" | "default" | null | undefined;
}) => {
  const [alertOpen, setAlertOpen] = React.useState<boolean | undefined>(false);
  const [pending, startTransition] = React.useTransition();

  async function handleDeleteWarga(userId: string) {
    startTransition(async () => {
      const result = await deleteWarga(userId);
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
      setAlertOpen(false);
    });
  }

  return (
    <AlertDialog open={alertOpen}>
      <Button
        onClick={() => setAlertOpen(true)}
        size={size}
        variant={"destructive"}
      >
        {children ? children : <Trash2Icon className="w-4 h-4" />}
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
            onClick={() => handleDeleteWarga(userId)}
            className="mb-2 sm:mb-0"
          >
            {pending ? <Loader2 className={"animate-spin mr-1"} /> : "Hapus"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

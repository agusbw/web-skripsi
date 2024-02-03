"use client";

import { Button } from "@/components/ui/button";
import { useTransition, useState } from "react";
import { Loader2 } from "lucide-react";
import { resetPasswordWarga } from "@/lib/server/actions";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ResetPasswordButton({ userId }: { userId: string }) {
  const [pending, startTransition] = useTransition();
  const [alertOpen, setAlertOpen] = useState<boolean | undefined>(false);

  async function handleResetPassword(userId: string) {
    startTransition(async () => {
      const res = await resetPasswordWarga(userId);

      if (res.success) {
        toast.success("Sukses", {
          description: res.message,
        });
      } else {
        toast.error("Gagal", {
          description: res.message,
        });
      }

      setAlertOpen(false);
    });
  }

  return (
    <AlertDialog open={alertOpen}>
      <Button
        onClick={() => setAlertOpen(true)}
        variant={"outline"}
      >
        Reset Password
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Konfirmasi Reset Password</AlertDialogTitle>
          <AlertDialogDescription>
            Password warga akan direset menjadi tanggal lahir warga.
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
            disabled={pending}
            onClick={() => handleResetPassword(userId)}
            className="mb-2 sm:mb-0"
          >
            {pending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            Yakin
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

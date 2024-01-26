"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      <AlertCircle className="h-8 w-8" />
      <p className="font-bold text-2xl">Error</p>
      <p className="font-semibold text-lg">Terjadi Kesalahan</p>
      <p className="my-2 text-muted-foreground font-medium">
        Tidak dapat memuat konten, silakan coba lagi!
      </p>
      <Button
        className="rounded-full mt-2"
        onClick={() => reset()}
      >
        <RefreshCw className="h-4 w-4 mr-1" /> Muat Ulang
      </Button>
    </div>
  );
}

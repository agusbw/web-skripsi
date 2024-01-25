import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      <AlertCircle className="h-8 w-8" />
      <p className="font-bold text-2xl">404</p>
      <p className="font-semibold text-lg">Halaman Tidak Ditemukan</p>
      <p className="my-2 text-muted-foreground font-medium">
        Konten yang Anda cari tidak ditemukan.
      </p>
      <Button
        className="rounded-full"
        asChild
      >
        <Link href="/">
          <Home className="h-4 w-4 mr-1 mb-0.5" /> Beranda
        </Link>
      </Button>
    </div>
  );
}

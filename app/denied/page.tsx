import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";

export default function Denied() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-primary">
      <AlertCircle className="h-8 w-8" />
      <p className="font-bold text-2xl">403</p>
      <p className="font-semibold text-lg">Akses Ditolak</p>
      <p className="my-2 text-muted-foreground font-medium">
        Anda tidak memiliki akses ke halaman ini.
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

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Denied() {
  return (
    <section className="flex flex-col items-center gap-3 justify-center h-screen">
      <h1 className="text-4xl font-bold text-primary text-center">
        Akses Ditolak
      </h1>
      <p className="max-w-2xl text-xl text-center">
        Anda tidak memiliki akses ke halaman ini.
      </p>
      <Button
        className="rounded-full"
        asChild
      >
        <Link href="/">Kembali ke Beranda</Link>
      </Button>
    </section>
  );
}

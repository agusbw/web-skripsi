import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center gap-3 justify-center h-screen">
      <h1 className="text-4xl font-bold text-primary text-center">
        Resource Tidak Ditemukan
      </h1>
      <p className="max-w-2xl text-xl text-center">
        Konten yang Anda cari tidak ditemukan.
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

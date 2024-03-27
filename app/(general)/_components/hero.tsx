"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function Hero() {
  return (
    <section>
      <div className="px-4 xl:px-20 xl:py-32 justify-center flex flex-col items-center py-12 xl:h-screen xl:flex-row xl:justify-around">
        <div className="flex xl:self-start flex-col items-center mb-12 text-center xl:flex-grow xl:w-1/2 xl:items-start xl:text-left max-w-[600px]">
          <h1 className={"text-3xl font-bold sm:text-4xl text-primary"}>
            Sistem Informasi Pengajuan Surat Keterangan
          </h1>
          <p className="font-semibold text-lg text-foreground/80 my-2">
            Desa Pelapuan, Kecamatan Busungbiu, Kabupaten Buleleng
          </p>
          <p className="leading-relaxed text-muted-foreground text-lg">
            Sistem Pengajuan Surat Keterangan (SIPSK) adalah sistem yang
            digunakan untuk mempermudah masyarakat dalam mengajukan surat
            keterangan kepada pemerintah Desa Pelapuan.
          </p>
          <div className="flex justify-center items-center gap-x-4 mt-6">
            <Button
              className="bg-gradient-to-br from-primary to-purple-400 text-white hover:text-white hover:from-primary hover:to-purple-600 rouned-lg"
              onClick={() =>
                signIn(undefined, {
                  callbackUrl: "/warga/pengajuan",
                })
              }
            >
              Ajukan Surat
            </Button>
            <Button
              asChild
              variant={"link"}
            >
              <Link href="/bantuan">
                Bantuan{" "}
                <MoveRight
                  className="ml-1"
                  size={12}
                />
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-5/6 xl:max-w-lg lg:flex justify-center xl:w-full md:w-1/2 xl:self-end">
          <Image
            className="object-cover object-center rounded-2xl shadow-md"
            alt="hero"
            src="/kegiatan-1.jpeg"
            width={450}
            height={350}
          />
        </div>
      </div>
    </section>
  );
}

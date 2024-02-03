"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Hero() {
  return (
    <section>
      <div className="px-4 lg:px-32 justify-center flex flex-col items-center py-10 lg:py-32 lg:flex-row text-primary">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow lg:w-1/2 lg:pr-24 lg:items-start lg:text-left lg:mb-0 space-y-3">
          <h1 className={"text-3xl font-bold sm:text-4xl"}>
            Sistem Informasi Pengajuan Surat Keterangan
          </h1>
          <p className="font-medium text-lg">
            Desa Pelapuan, Kecamatan Busungbiu, Kabupaten Buleleng
          </p>
          <p className="leading-relaxed text-muted-foreground text-base">
            Sistem Pengajuan Surat Keterangan (SIPSK) adalah sistem yang
            digunakan untuk mempermudah masyarakat dalam mengajukan surat
            keterangan kepada pemerintah Desa Pelapuan.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => signIn()}
              className="relative inline-flex h-10 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                Ajukan Surat
              </span>
            </button>
          </div>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:flex justify-center lg:w-full md:w-1/2">
          <Image
            className="object-cover object-center"
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

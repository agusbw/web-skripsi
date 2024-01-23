"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Hero() {
  return (
    <section>
      <div className="px-4 lg:px-20 flex flex-col items-center pt-10 lg:pt-20 md:flex-row bg-primary text-primary-foreground">
        <div className="flex flex-col items-center mb-16 text-center lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 md:items-start md:text-left md:mb-0 space-y-3">
          <h1 className="text-3xl font-semibold file: sm:text-4xl">
            Sistem Informasi Pengajuan Surat Keterangan
          </h1>
          <p className="font-bold text-lg">
            Desa Pelapuan, Kecamatan Busungbiu, Kabupaten Buleleng
          </p>
          <p className="leading-relaxed">
            Sistem Pengajuan Surat Keterangan (SIPSK) adalah sistem yang
            digunakan untuk mempermudah masyarakat dalam mengajukan surat
            keterangan kepada pemerintah Desa Pelapuan.
          </p>
          <div className="flex justify-center gap-4">
            <Button
              size={"lg"}
              variant={"secondary"}
              className="rounded-full"
              onClick={() => signIn()}
            >
              Ajukan Surat
            </Button>
          </div>
        </div>
        <div className="w-5/6 lg:max-w-lg lg:w-full md:w-1/2">
          <Image
            className="object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
            width={720}
            height={600}
          />
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#7c3aed"
          fillOpacity="1"
          d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,133.3C840,96,960,64,1080,64C1200,64,1320,96,1380,112L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
}

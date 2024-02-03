import DashboardContainer from "@/components/layouts/dashboard-container";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Metadata } from "next";
import prisma from "@/lib/server/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pengajuan Surat",
  description: "Halaman Pengajuan Surat Warga",
};

export default async function PengajuanPage() {
  const kategori = await prisma.kategoriSurat.findMany({
    select: {
      nama: true,
      kode: true,
    },
  });

  function getDescription(code: "SKU" | "SKBPK" | "SKTM" | "SKD") {
    let description = "";
    switch (code) {
      case "SKU":
        description =
          "Surat keterangan yang menyatakan bahwa seseorang memiliki usaha.";
        break;
      case "SKTM":
        description =
          "Surat keterangan untuk masyarakat yang tidak mampu secara ekonomi";
        break;
      case "SKD":
        description = "Surat keterangan yang menyatakan domisili seseorang.";
        break;
      case "SKBPK":
        description =
          "Surat keterangan yang menyatakan bahwa seseorang belum pernah menikah.";
        break;

      default:
        break;
    }

    return description;
  }

  return (
    <DashboardContainer title="Pengajuan Surat Keterangan">
      <p className="text-xl font-medium">Pilih Jenis Surat Keterangan</p>
      <p className="text-muted-foreground text-sm">
        Berikut adalah surat keterangan yang dapat diajukan pada website ini.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-4 gap-4">
        {kategori?.map((k) => (
          <Card
            className="relative"
            key={k.kode}
          >
            <CardHeader>
              <CardTitle>{k.nama}</CardTitle>
              <CardDescription className="pb-10">
                {getDescription(k.kode)}
              </CardDescription>
            </CardHeader>
            <CardFooter className="absolute bottom-0 right-0">
              <Link
                href={"/warga/pengajuan/" + k.kode.toLowerCase()}
                className="text-primary transition-all duration-300 hover:text-primary/80 text-sm font-semibold"
              >
                Ajukan surat →
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardContainer>
  );
}

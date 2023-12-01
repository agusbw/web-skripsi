import DashboardContainer from "@/components/layouts/dashboard-container";
import { Info } from "lucide-react";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import AddBiodataForm from "./_components/add-biodata-form";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BiodataPage() {
  const session = await getServerSession(authOptions);

  const biodata = await prisma.warga.findUnique({
    where: { id_user: session?.user.id }
  });

  return (
    <DashboardContainer title="Biodata Pemilik Akun">
      <Alert className="w-full mb-4">
        <Info className="w-4 h-4" />
        <AlertTitle className="text-lg font-semibold">
          {!biodata ? "Lengkapi Biodata!" : "Biodata Lengkap!"}
        </AlertTitle>
        <AlertDescription className="text-justify">
          {!biodata ? (
            <>
              <p>
                Pengajuan surat keterangan dapat dilakukan{" "}
                <span className="font-bold">setelah</span> anda melengkapi
                biodata anda.
              </p>
              <p>
                Biodata digunakan untuk mengetahui data pemohon dan verifikasi
                penerimaan pengajuan surat.{" "}
              </p>
            </>
          ) : (
            <>
              <p>
                Biodata anda sudah lengkap, anda dapat mengajukan surat
                keterangan melalui menu{" "}
                <Link
                  href={"/warga/pengajuan"}
                  className="font-semibold"
                >
                  Pengajuan Surat
                </Link>
                .
              </p>
              <p>
                Anda dapat mengubah biodata anda apa bila terjadi kesalahan atau
                perubahan data.
              </p>
            </>
          )}
        </AlertDescription>
      </Alert>
      <Separator />
      {/* <AddBiodataForm biodata={biodata} /> */}
    </DashboardContainer>
  );
}

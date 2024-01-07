import DashboardContainer from "@/components/layouts/dashboard-container";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { type Metadata } from "next";
import prisma from "@/lib/prisma";

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

  return (
    <DashboardContainer title="Pengajuan Surat Keterangan">
      <p className="text-xl font-medium">Pilih Jenis Surat Keterangan</p>
      <div className="max-w-[700px] mt-2 border p-2">
        <Table>
          <TableBody>
            {kategori?.map((k) => (
              <TableRow key={k.kode}>
                <TableCell className="font-medium">{k.nama}</TableCell>
                <TableCell className="flex justify-end">
                  <Button asChild>
                    <Link href={`/warga/pengajuan/${k.kode.toLowerCase()}`}>
                      Ajukan
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardContainer>
  );
}

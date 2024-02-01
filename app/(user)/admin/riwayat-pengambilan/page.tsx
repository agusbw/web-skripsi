import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchSuratDiambil } from "@/lib/data";
import { RiwayatPengambilanTable } from "./_components/data-table";
import { riwayatPengambilanColumns } from "./_components/columns";
import ExportPDF from "./_components/export-pdf";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Riwayat Pengambilan",
  description: "Riwayat Pengambilan",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RiwayatPengambilanPage() {
  const data = await fetchSuratDiambil();

  return (
    <DashboardContainer title="Data Pengambilan Surat">
      <p className="mb-5 text-muted-foreground">
        Berikut adalah data riwayat pengambilan surat yang telah dilakukan oleh
        warga.
      </p>
      <div className="w-full flex justify-end mt-5">
        <ExportPDF data={data} />
      </div>
      <RiwayatPengambilanTable
        data={data}
        columns={riwayatPengambilanColumns}
      />
    </DashboardContainer>
  );
}

import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchSuratDiambil } from "@/lib/server/data";
import { riwayatPengambilanColumns } from "./_components/columns";
import ExportPDF from "./_components/export-pdf";
import { type Metadata } from "next";
import DateFIlter from "./_components/date-filter";
import { RiwayatPengambilanTable } from "./_components/data-table";

export const metadata: Metadata = {
  title: "Riwayat Pengambilan",
  description: "Riwayat Pengambilan",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function RiwayatPengambilanPage({
  searchParams,
}: {
  searchParams?: { startDate?: string; endDate?: string };
}) {
  let data = await fetchSuratDiambil();

  const startDate = searchParams?.startDate ?? null;
  const endDate = searchParams?.endDate ?? null;

  if (startDate && endDate) {
    data = data.filter((d) => {
      let date = new Date(d.createdAt);
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      date = new Date(date.getTime() - timezoneOffset);

      const start = new Date(startDate).setUTCHours(0, 0, 0, 0);
      const end = new Date(endDate).setUTCHours(23, 59, 59, 999);

      return date.getTime() >= start && date.getTime() <= end;
    });
  }

  return (
    <DashboardContainer title="Data Pengambilan Surat">
      <p className="mb-5 text-muted-foreground">
        Berikut adalah data riwayat pengambilan surat yang telah dilakukan oleh
        warga.
      </p>
      <div className="w-full flex flex-col lg:flex-row lg:justify-between mt-5">
        <DateFIlter />
        <ExportPDF
          data={data}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
        />
      </div>
      <RiwayatPengambilanTable
        data={data}
        columns={riwayatPengambilanColumns}
      />
    </DashboardContainer>
  );
}

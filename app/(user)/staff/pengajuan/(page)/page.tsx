import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllSurat } from "@/lib/server/data";
import DateFilter from "../_components/date-filter";
import { getCurrentSession } from "@/lib/server/auth";
import {
  pendingColumns,
  ditolakColumns,
  diprosesColumns,
  diterimaColumns,
} from "../_components/columns";
import { type Metadata } from "next";
import ExportPDF from "../_components/export-pdf";
import { DataTable } from "../_components/data-table";

export const metadata: Metadata = {
  title: "Pengajuan",
  description: "Data pengajuan surat warga.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengajuanPage({
  searchParams,
}: {
  searchParams?: { startDate?: string; endDate?: string };
}) {
  let surat = await fetchAllSurat();
  const session = await getCurrentSession();

  const startDate = searchParams?.startDate ?? null;
  const endDate = searchParams?.endDate ?? null;

  if (startDate && endDate) {
    surat = surat.filter((d) => {
      let date = new Date(d.createdAt);
      const timezoneOffset = date.getTimezoneOffset() * 60000;
      date = new Date(date.getTime() - timezoneOffset);

      const start = new Date(startDate).setUTCHours(0, 0, 0, 0);
      const end = new Date(endDate).setUTCHours(23, 59, 59, 999);

      return date.getTime() >= start && date.getTime() <= end;
    });
  }

  const suratPending = surat.filter((item) => item.status === "PENDING");
  const suratDiproses = surat.filter((item) => item.status === "DIPROSES");
  const suratDitolak = surat.filter((item) => item.status === "DITOLAK");
  const suratDiterima = surat.filter((item) => item.status === "DITERIMA");

  return (
    <DashboardContainer
      title={
        session?.user.role === "ADMIN"
          ? "Data Pengajuan Surat"
          : "Terima Pengajuan Surat"
      }
    >
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 sm:mb-0">
        <DateFilter />
        <ExportPDF
          data={surat}
          startDate={startDate ? new Date(startDate) : null}
          endDate={endDate ? new Date(endDate) : null}
        />
      </div>
      <Tabs
        defaultValue={session?.user.role === "ADMIN" ? "pending" : "diproses"}
      >
        <TabsList>
          {session?.user.role === "ADMIN" && (
            <TabsTrigger value="pending">Pending</TabsTrigger>
          )}
          <TabsTrigger value="diproses">Diproses</TabsTrigger>
          <TabsTrigger value="diterima">Diterima</TabsTrigger>
          <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <DataTable
            data={suratPending}
            columns={pendingColumns}
          />
        </TabsContent>
        <TabsContent value="diproses">
          <DataTable
            data={suratDiproses}
            columns={diprosesColumns}
          />
        </TabsContent>
        <TabsContent value="diterima">
          <DataTable
            data={suratDiterima}
            columns={diterimaColumns}
          />
        </TabsContent>
        <TabsContent value="ditolak">
          <DataTable
            data={suratDitolak}
            columns={ditolakColumns}
          />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

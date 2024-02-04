import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllSurat } from "@/lib/server/data";
import DataTableWrapper from "../_components/table-wrapper";
import {
  pendingColumns,
  ditolakColumns,
  selesaiColumns,
} from "../_components/columns";

import { type Metadata } from "next";
import ExportPDF from "../_components/export-pdf";

export const metadata: Metadata = {
  title: "Pengajuan",
  description: "Data pengajuan surat warga.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengajuanPage() {
  const surat = await fetchAllSurat();

  const suratPending = surat.filter((item) => item.status === "PENDING");
  const suratSelesai = surat.filter((item) => item.status === "SELESAI");
  const suratDitolak = surat.filter((item) => item.status === "DITOLAK");

  return (
    <DashboardContainer title="Data Pengajuan Surat">
      <div className="flex justify-end mb-4">
        <ExportPDF data={surat} />
      </div>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="selesai">Selesai</TabsTrigger>
          <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <DataTableWrapper
            data={suratPending}
            columns={pendingColumns}
          />
        </TabsContent>
        <TabsContent value="selesai">
          <DataTableWrapper
            data={suratSelesai}
            columns={selesaiColumns}
          />
        </TabsContent>
        <TabsContent value="ditolak">
          <DataTableWrapper
            data={suratDitolak}
            columns={ditolakColumns}
          />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

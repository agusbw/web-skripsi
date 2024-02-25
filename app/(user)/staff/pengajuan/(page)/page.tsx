import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAllSurat } from "@/lib/server/data";
import DataTableWrapper from "../_components/table-wrapper";
import { getCurrentSession } from "@/lib/server/auth";
import {
  pendingColumns,
  ditolakColumns,
  diprosesColumns,
  diterimaColumns,
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
  const session = await getCurrentSession();

  const suratPending = surat.filter((item) => item.status === "PENDING");
  const suratDiproses = surat.filter((item) => item.status === "DIPROSES");
  const suratDitolak = surat.filter((item) => item.status === "DITOLAK");
  const suratDiterima = surat.filter((item) => item.status === "DITERIMA");

  return (
    <DashboardContainer title="Data Pengajuan Surat">
      <div className="flex justify-end mb-4">
        <ExportPDF data={surat} />
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
          <DataTableWrapper
            data={suratPending}
            columns={pendingColumns}
          />
        </TabsContent>
        <TabsContent value="diproses">
          <DataTableWrapper
            data={suratDiproses}
            columns={diprosesColumns}
          />
        </TabsContent>
        <TabsContent value="diterima">
          <DataTableWrapper
            data={suratDiterima}
            columns={diterimaColumns}
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

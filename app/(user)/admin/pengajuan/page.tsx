import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchSuratPending,
  fetchSuratDitolak,
  fetchSuratSelesai,
} from "@/lib/data";
import DataTableWrapper from "./_components/table-wrapper";
import {
  pendingColumns,
  ditolakColumns,
  selesaiColumns,
} from "./_components/columns";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengajuan",
  description: "Data pengajuan surat warga.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengajuanPage() {
  const suratPendingPromise = fetchSuratPending();
  const suratDitolakPromise = fetchSuratDitolak();
  const suratSelesaiPromise = fetchSuratSelesai();

  const [suratPending, suratDitolak, suratSelesai] = await Promise.all([
    suratPendingPromise,
    suratDitolakPromise,
    suratSelesaiPromise,
  ]);

  return (
    <DashboardContainer title="Data Pengajuan Surat">
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

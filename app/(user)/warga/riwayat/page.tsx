import {
  pendingColumns,
  selesaiColumns,
  ditolakColumns,
} from "./_components/columns";
import { DataTable } from "./_components/data-table";
import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchUserSuratPending,
  fetchUserSuratDitolak,
  fetchUserSuratSelesai,
} from "@/lib/data";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Riwayat Pengajuan",
  description: "Halaman Pengajuan Surat Warga",
};

export default async function BiodataPage() {
  const fetchSuratPending = fetchUserSuratPending();
  const fetchSuratSelesai = fetchUserSuratSelesai();
  const fetchSuratDitolak = fetchUserSuratDitolak();

  const [suratPending, suratSelesai, suratDitolak] = await Promise.all([
    fetchSuratPending,
    fetchSuratSelesai,
    fetchSuratDitolak,
  ]);

  return (
    <DashboardContainer title="Riwayat Pengajuan Surat">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="selesai">Selesai</TabsTrigger>
          <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang{" "}
              <span className="font-bold">belum selesai</span> diproses akan
              ditampilkan di sini.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={pendingColumns}
            data={suratPending}
          />
        </TabsContent>
        <TabsContent value="selesai">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang telah
              <span className="font-bold"> selesai</span> diproses akan
              ditampilkan di sini.
              <p>Surat sudah dapat diambil di kantor desa.</p>
            </AlertDescription>
          </Alert>
          <DataTable
            columns={selesaiColumns}
            data={suratSelesai}
          />
        </TabsContent>
        <TabsContent value="ditolak">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang <span className="font-bold">ditolak</span>{" "}
              akan ditampilkan di sini.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={ditolakColumns}
            data={suratDitolak}
          />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

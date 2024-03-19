import {
  pendingColumns,
  selesaiColumns,
  ditolakColumns,
  diambilColumns,
} from "./_components/columns";
import { DataTable } from "./_components/data-table";
import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchALlUserSurat } from "@/lib/server/data";
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
  const surat = await fetchALlUserSurat();

  const suratPending = surat.filter((item) => item.status === "PENDING");
  const suratDiproses = surat.filter((item) => item.status === "DIPROSES");
  const suratDiterima = surat.filter((item) => item.status === "DITERIMA");
  const suratDiambil = surat.filter((item) => item.status === "DIAMBIL");
  const suratDitolak = surat.filter((item) => item.status === "DITOLAK");

  return (
    <DashboardContainer title="Riwayat Pengajuan Surat">
      <Tabs defaultValue="pending">
        <ScrollArea
          className="w-full max-w-[100vh] my-2"
          type="always"
        >
          <TabsList className="mb-3">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="diproses">Diproses</TabsTrigger>
            <TabsTrigger value="diterima">Diterima</TabsTrigger>
            <TabsTrigger value="diambil">Diambil</TabsTrigger>
            <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="pending">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang{" "}
              <span className="font-bold">belum diproses/dilihat admin</span>{" "}
              akan ditampilkan di sini.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={pendingColumns}
            data={suratPending}
          />
        </TabsContent>
        <TabsContent value="diproses">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang
              <span className="font-bold">
                {" "}
                masih diverifikasi/ditandatangani
              </span>{" "}
              perbekel akan tampil di sini.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={pendingColumns}
            data={suratDiproses}
          />
        </TabsContent>
        <TabsContent value="diterima">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang
              <span className="font-bold"> sudah selesai/diterima</span> akan
              tampil di sini. Surat sudah bisa diambil di kantor perbekel.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={selesaiColumns}
            data={suratDiterima}
          />
        </TabsContent>
        <TabsContent value="diambil">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Surat yang telah
              <span className="font-bold"> diambil</span> akan ditampilkan di
              sini, surat berikut sudah anda ambil di kantor desa.
            </AlertDescription>
          </Alert>
          <DataTable
            columns={diambilColumns}
            data={suratDiambil}
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

import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchWargaByUserId, fetchSuratByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import CreateWarga from "../_components/create-warga-button";
import { Contact, FileBarChart, FileClock } from "lucide-react";
import WargaBiodata from "./_components/warga-biodata";
import DataTableWrapper from "./_components/table-wrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  // TODO: tambahin aksi pada table surat

  const wargaPromise = fetchWargaByUserId(params.userId);
  const suratPromise = fetchSuratByUserId(params.userId);

  const [warga, surat] = await Promise.all([wargaPromise, suratPromise]);

  if (!warga) notFound();

  return (
    <DashboardContainer title="Informasi Warga">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <Contact className="inline-block w-6 h-6 text-primary" /> Detail
            Data Warga
          </h3>
          <WargaBiodata warga={warga} />
          <div className="mt-5 ml-auto w-fit">
            <CreateWarga
              variant="default"
              warga={warga}
              buttonText="Ubah Data Warga"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <FileBarChart className="inline-block w-6 h-6 text-primary" />{" "}
            Jumlah Pengajuan Surat
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Total</CardTitle>
                <CardDescription className="font-medium text-sm">
                  {surat.length} Surat
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Pending</CardTitle>
                <CardDescription className="font-medium text-sm">
                  {surat.filter((s) => s.status === "PENDING").length} Surat
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Selesai</CardTitle>
                <CardDescription className="font-medium text-sm">
                  {surat.filter((s) => s.status === "SELESAI").length} Surat
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Ditolak</CardTitle>
                <CardDescription className="font-medium text-sm">
                  {surat.filter((s) => s.status === "DITOLAK").length} Surat
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <FileClock className="inline-block w-6 h-6 text-primary" /> Riwayat
            Pengajuan Surat
          </h3>
          <DataTableWrapper data={surat} />
        </div>
      </div>
    </DashboardContainer>
  );
}

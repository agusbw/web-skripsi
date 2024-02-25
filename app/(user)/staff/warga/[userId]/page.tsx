import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchWargaByUserId, fetchSuratByUserId } from "@/lib/server/data";
import { notFound } from "next/navigation";
import CreateWarga from "../_components/create-warga-button";
import WargaBiodata from "./_components/warga-biodata";
import DataTableWrapper from "./_components/table-wrapper";
import ResetPasswordButton from "./_components/reset-password";
import { type Metadata } from "next";
import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
} from "lucide-react";
import SuratCountCard from "@/components/dashboard/surat-count-card";

export const metadata: Metadata = {
  title: "Informasi Warga",
  description: "Halaman informasi warga",
};

export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const wargaPromise = fetchWargaByUserId(params.userId);
  const suratPromise = fetchSuratByUserId(params.userId);

  const [warga, surat] = await Promise.all([wargaPromise, suratPromise]);

  if (!warga) notFound();

  return (
    <DashboardContainer title="Informasi Warga">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-4 text-2xl font-medium">Detail Data Warga</h3>
          <WargaBiodata warga={warga} />
          <div className="mt-5 ml-auto w-fit flex gap-3">
            <ResetPasswordButton userId={warga.id_user} />
            <CreateWarga
              variant="default"
              warga={warga}
              buttonText="Ubah Data Warga"
            />
          </div>
        </div>
        <div className="my-10">
          <h3 className="mb-4 text-2xl font-medium">Jumlah Pengajuan Surat</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            <SuratCountCard
              title="Total"
              count={surat.length}
              Icon={Mails}
            />
            <SuratCountCard
              title="Pending"
              count={surat.filter((s) => s.status === "PENDING").length}
              Icon={MailQuestion}
              className="bg-yellow-500 text-white"
            />

            <SuratCountCard
              title="Selesai"
              count={surat.filter((s) => s.status === "SELESAI").length}
              Icon={MailCheck}
              className="bg-green-500 text-white"
            />
            <SuratCountCard
              title="Diambil"
              count={surat.filter((s) => s.status === "DIAMBIL").length}
              Icon={CheckCheck}
              className="bg-blue-500 text-white"
            />
            <SuratCountCard
              title="Ditolak"
              count={surat.filter((s) => s.status === "DITOLAK").length}
              Icon={MailX}
              className="bg-red-500 text-white"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">Riwayat Pengajuan Surat</h3>
          <DataTableWrapper data={surat} />
        </div>
      </div>
    </DashboardContainer>
  );
}

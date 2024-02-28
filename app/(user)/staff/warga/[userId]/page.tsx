import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchWargaByUserId, fetchSuratByUserId } from "@/lib/server/data";
import { notFound } from "next/navigation";
import UpdateWarga from "../_components/create-warga-button";
import { DeleteWarga } from "../_components/delete-warga-button";
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
  Loader,
  FileEdit,
  Trash2Icon,
} from "lucide-react";
import SuratCountCard from "@/components/dashboard/surat-count-card";
import ResetUsernameButton from "./_components/reset-username";

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
          <div className="mt-5 ml-auto  flex justify-between">
            <div className="flex gap-x-3">
              <ResetPasswordButton userId={warga.id_user} />
              <ResetUsernameButton userId={warga.id_user} />
            </div>
            <div className="flex gap-x-3">
              <UpdateWarga
                variant="default"
                warga={warga}
                size={"default"}
              >
                <FileEdit
                  size={18}
                  className="mr-1"
                />{" "}
                | Edit Data
              </UpdateWarga>
              <DeleteWarga
                size={"default"}
                userId={warga.id_user}
              >
                <Trash2Icon
                  size={18}
                  className="mr-1"
                />{" "}
                | Hapus Data
              </DeleteWarga>
            </div>
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
              Icon={Loader}
              className="bg-yellow-500 text-white"
            />
            <SuratCountCard
              title="Diproses"
              count={surat.filter((s) => s.status === "DIPROSES").length}
              Icon={MailQuestion}
              className="bg-teal-500 text-white"
            />
            <SuratCountCard
              title="Diterima"
              count={surat.filter((s) => s.status === "DITERIMA").length}
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

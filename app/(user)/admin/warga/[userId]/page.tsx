import DashboardContainer from "@/components/layouts/dashboard-container";
import { fetchWargaByUserId } from "@/lib/data";
import { notFound } from "next/navigation";
import CreateWarga from "../_components/create-warga-button";
import { formatEnumValue } from "@/lib/utils";
import { format } from "date-fns";
import { Contact, FileClock } from "lucide-react";

export default async function Page({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const warga = await fetchWargaByUserId(params.userId);
  if (!warga) notFound();

  return (
    <DashboardContainer title="Informasi Warga">
      <div className="flex flex-col gap-5">
        <div className="w-fit">
          <h3 className="mb-4 text-2xl font-semibold">
            <Contact className="inline-block w-6 h-6 text-primary" /> Detail
            Data Warga
          </h3>
          <div className="flex items-start flex-col gap-4">
            <table>
              <tbody>
                <tr>
                  <td className="font-semibold">NIK</td>
                  <td>: {warga.nik}</td>
                </tr>
                <tr>
                  <td className="font-semibold">NO KK</td>
                  <td>: {warga.no_kk}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Nama</td>
                  <td>: {warga.nama}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Alamat</td>
                  <td>: {warga.alamat}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Jenis Kelamin</td>
                  <td>: {warga.jenis_kelamin ? "Laki-laki" : "Perempuan"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Tempat/Tanggal Lahir</td>
                  <td>
                    : {warga.tempat_lahir} /{" "}
                    {format(warga.tanggal_lahir, "dd MMMM yyyy")}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Pekerjaan</td>
                  <td>: {warga?.pekerjaan ? warga.pekerjaan : "-"}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Agama</td>
                  <td>: {formatEnumValue(warga.agama)}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Kewarganegaraan</td>
                  <td>: {warga.kewarganegaraan}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Status Perkawinnan</td>
                  <td>: {formatEnumValue(warga.status_perkawinan)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 ml-auto w-fit">
            <CreateWarga
              variant="default"
              warga={warga}
              buttonText="Ubah Data Warga"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-semibold">
            <FileClock className="inline-block w-6 h-6 text-primary" /> Riwayat
            Pengajuan Surat
          </h3>
        </div>
      </div>
    </DashboardContainer>
  );
}

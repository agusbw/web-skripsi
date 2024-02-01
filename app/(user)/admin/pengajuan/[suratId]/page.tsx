import DashboardContainer from "@/components/layouts/dashboard-container";
import type { Metadata } from "next";
import { fetchSuratById } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import SuratStatusBadge from "@/components/surat-status-badge";
import { Button } from "@/components/ui/button";
import DataItem from "@/components/data-item-field";
import type { KategoriSurat, Status, Surat } from "@prisma/client";
import { formatEnumValue } from "@/lib/utils";
import TolakButton from "./_components/tolak-button";
import SelesaiButton from "./_components/selesai-button";
import NomorSuratButton from "./_components/nomor-surat-button";

export const metadata: Metadata = {
  title: "Proses Surat",
  description: "Proses Surat",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

function DataSuratByKode({
  surat,
}: {
  surat: Surat & {
    kategori_surat: KategoriSurat;
    warga: {
      user: {
        id: string;
      };
      nik: string;
      nama: string;
    };
  };
}) {
  if (surat.kategori_surat.kode === "SKU") {
    return (
      <>
        <DataItem
          label="Nama Usaha"
          value={surat.nama_usaha}
        />
        <DataItem
          label="Jenis Usaha"
          value={surat.lokasi_usaha}
        />
      </>
    );
  }

  if (surat.kategori_surat.kode === "SKD") {
    return (
      <>
        <DataItem
          label="Domisili / Tempat Tinggal Sementara"
          value={surat.domisili}
        />
      </>
    );
  }

  if (surat.kategori_surat.kode === "SKTM") {
    return (
      <>
        <DataItem
          label="Status DTKS"
          value={surat.dtks ? "Terdaftar" : "Tidak Terdaftar"}
        />
      </>
    );
  }
}

function generateTitle(suratStatus: Status) {
  if (suratStatus === "PENDING") {
    return "Proses Pengajuan Surat";
  }

  return "Detail Surat";
}

export default async function DetailSurat({
  params,
}: {
  params: {
    suratId: string;
  };
}) {
  const surat = await fetchSuratById(params.suratId);
  if (!surat) {
    notFound();
  }

  return (
    <DashboardContainer title={generateTitle(surat.status)}>
      <div>
        <p className="text-xl font-medium text-primary">Data Pemohon Surat</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <DataItem
            label="NIK"
            value={surat.nik}
          />
          <DataItem
            label="No KK"
            value={surat.no_kk}
          />
          <DataItem
            label="Nama"
            value={surat.nama}
          />
          <DataItem
            label="Tempat & Tanggal Lahir"
            value={`${surat.tempat_lahir}, ${format(
              new Date(surat.tanggal_lahir),
              "dd MMMM yyyy",
              {
                locale: id,
              }
            )}`}
          />
          <DataItem
            label="Jenis Kelamin"
            value={surat.jenis_kelamin ? "Laki-laki" : "Perempuan"}
          />
          <DataItem
            label="Agama"
            value={formatEnumValue(surat.agama)}
          />
          <DataItem
            label="Kewarganegaraan"
            value={surat.kewarganegaraan}
          />
          <DataItem
            label="Pekerjaan"
            value={surat.pekerjaan ? surat.pekerjaan : "-"}
          />
          <DataItem
            label="Status Perkawinan"
            value={formatEnumValue(surat.status_perkawinan)}
          />
        </div>
      </div>
      <div className="w-full mt-4">
        <p className="text-xl font-medium text-primary">Data Pengajuan Surat</p>
        <div className="flex gap-3 max-w-full items-end">
          <DataItem
            label="Nomor Surat"
            value={surat.no_surat ? surat.no_surat : "Belum diberi nomor surat"}
            className="min-w-[300px] max-w-full"
          />
          {surat.status === "PENDING" && (
            <NomorSuratButton
              suratId={surat.id}
              noSurat={surat.no_surat}
            />
          )}
        </div>

        <div className="space-y-2 mt-2 grid">
          <div className="flex">
            <p className="font-medium text-sm">Status:</p>
            <SuratStatusBadge
              status={surat.status}
              className="ml-2 rounded-none"
            />
          </div>
          <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2">
            <DataItem
              label="Jenis Surat"
              value={surat.kategori_surat.nama}
            />
            <DataSuratByKode surat={surat} />
            <DataItem
              label="Keperluan"
              value={surat.keperluan}
            />
            <DataItem
              label="Tanggal Pengajuan"
              value={format(surat.createdAt, "dd MMMM yyyy", {
                locale: id,
              })}
            />
          </div>
        </div>
      </div>
      {surat.status !== "DITOLAK" && (
        <div className="mt-8 flex w-full justify-between">
          <Button variant={"outline"}>Unduh Template Surat</Button>
          <div className="flex gap-3">
            {surat.status === "PENDING" && (
              <>
                <TolakButton suratId={surat.id} />
                <SelesaiButton
                  suratId={surat.id}
                  noSurat={surat.no_surat}
                />
              </>
            )}
            {surat.status === "SELESAI" && (
              <Button className="">Surat Telah Diambil</Button>
            )}
          </div>
        </div>
      )}
      {surat.status === "DITOLAK" && (
        <div className="my-4">
          <p className="font-medium text-lg">Alasan Penolakan:</p>
          <p className="">{surat.pesan_penolakan}</p>
        </div>
      )}
    </DashboardContainer>
  );
}

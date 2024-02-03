import DashboardContainer from "@/components/layouts/dashboard-container";
import type { Metadata } from "next";
import { fetchSuratById } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import SuratStatusBadge from "@/components/surat-status-badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DataItem from "@/components/data-item-field";
import Link from "next/link";
import type { KategoriSurat, Surat } from "@prisma/client";
import { formatEnumValue } from "@/lib/utils";
import TolakButton from "./_components/tolak-button";
import SelesaiButton from "./_components/selesai-button";
import NomorSuratButton from "./_components/nomor-surat-button";
import DiambilButton from "./_components/diambil-button";
import { DeleteSuratButton } from "../_components/columns";
import { Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Detail Surat",
  description: "Detail Surat",
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
        <div>
          <Label className="font-semibold">Foto Usaha:</Label>
          <div className="p-2 bg-accent text-accent-foreground border cursor-not-allowed w-full text-sm">
            {surat.foto_usaha ? (
              <Link
                href={surat.foto_usaha}
                className="text-primary hover:underline text-sm"
                target="_blank"
                rel="noreferrer noopener"
              >
                Link Foto Bukti Usaha
              </Link>
            ) : (
              "Tidak ada foto"
            )}
          </div>
        </div>
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
    <DashboardContainer title={"Detail Pengajuan Surat"}>
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
      <div className="w-full mt-8">
        <p className="text-xl font-medium text-primary">Data Pengajuan Surat</p>
        <div className="flex gap-3 items-end max-w-full">
          <DataItem
            label="Nomor Surat"
            value={surat.no_surat ? surat.no_surat : "Belum diberi nomor surat"}
            className="max-w-full w-[300px]"
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
              className="ml-2"
            />
          </div>
          {surat.status === "DIAMBIL" && surat.tanggal_pengambilan && (
            <DataItem
              className="w-full max-w-sm"
              label="Tanggal Pengambilan Surat"
              value={format(surat.tanggal_pengambilan, "dd MMMM yyyy", {
                locale: id,
              })}
            />
          )}
          {surat.status === "DITOLAK" && (
            <DataItem
              className="w-full max-w-sm"
              label="Pesan Penolakan"
              value={surat.pesan_penolakan ? surat.pesan_penolakan : "-"}
            />
          )}
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

      <div className="mt-5">
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-y-0 sm:gap-x-3">
          {surat.status !== "DITOLAK" && (
            <Button
              size={"sm"}
              variant={"outline"}
            >
              Unduh Template Surat
            </Button>
          )}
          <DeleteSuratButton
            suratId={surat.id}
            size={"sm"}
            pushUrl="/admin/pengajuan"
          >
            <Trash2 size={17} /> | Hapus Surat
          </DeleteSuratButton>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        {surat.status !== "DITOLAK" && (
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
              <DiambilButton
                suratId={surat.id}
                noSurat={surat.no_surat}
              />
            )}
          </div>
        )}
      </div>
    </DashboardContainer>
  );
}

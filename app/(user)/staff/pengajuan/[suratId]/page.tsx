import DashboardContainer from "@/components/layouts/dashboard-container";
import type { Metadata } from "next";
import { fetchSuratById } from "@/lib/server/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import SuratStatusBadge from "@/components/surat-status-badge";
import { Label } from "@/components/ui/label";
import DataItem from "@/components/data-item-field";
import Link from "next/link";
import type { KategoriSurat, Surat } from "@prisma/client";
import { formatEnumValue } from "@/lib/utils";
import TolakButton from "./_components/tolak-button";
import ProsesButton from "./_components/diproses-button";
import TerimaButton from "./_components/diterima-button";
import { getCurrentSession } from "@/lib/server/auth";
import NomorSuratButton from "./_components/nomor-surat-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { DeleteSuratButton } from "../_components/columns";
import CreateTemplateButton from "./_components/create-template-button";
import { Trash2 } from "lucide-react";
import { getPDFData } from "@/lib/server/pdf";
import { utcToZonedTime } from "date-fns-tz";

export const metadata: Metadata = {
  title: "Detail Surat",
  description: "Detail Surat",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

type DataSuratByKodeProps = {
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
};

function DataSuratByKode({ surat }: DataSuratByKodeProps) {
  if (surat.kategori_surat.kode === "SKU") {
    return (
      <>
        <DataItem
          label="Nama Usaha"
          value={surat.nama_usaha}
        />
        <DataItem
          label="Lokasi Usaha"
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
      <DataItem
        label="Domisili / Tempat Tinggal Sementara"
        value={surat.domisili}
      />
    );
  }

  if (surat.kategori_surat.kode === "SKTM") {
    return (
      <DataItem
        label="Status DTKS"
        value={surat.dtks ? "Terdaftar" : "Tidak Terdaftar"}
      />
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

  const session = await getCurrentSession();

  let pdf = await getPDFData(`${surat.kategori_surat.kode}.pdf`);
  pdf = JSON.parse(JSON.stringify(pdf));

  // Convert date to Singrapore
  const date = utcToZonedTime(surat.tanggal_lahir, "Asia/Singapore");
  surat.tanggal_lahir = date;

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
            label="Alamat"
            value={surat.alamat}
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

      <div className="my-4">
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-y-0 sm:gap-x-3">
          {surat.status !== "DITOLAK" && pdf !== null && (
            <CreateTemplateButton
              className={session?.user.role === "PERBEKEL" ? "hidden" : ""}
              data={surat}
              pdf={pdf}
            />
          )}
          {session?.user.role === "ADMIN" && (
            <DeleteSuratButton
              suratId={surat.id}
              size={"sm"}
              pushUrl="/staff/pengajuan"
              className="w-fit"
            >
              <Trash2 size={17} /> | Hapus Surat
            </DeleteSuratButton>
          )}
        </div>
      </div>

      {/* only admin can change to diproses (first step letter verification) */}
      {surat.status === "PENDING" && session?.user.role === "ADMIN" && (
        <div className="flex justify-end mt-8">
          <div className="flex gap-3">
            <TolakButton suratId={surat.id} />
            <ProsesButton
              suratId={surat.id}
              noSurat={surat.no_surat}
            />
          </div>
        </div>
      )}

      {/* only perbekel can change to diterima (last step letter verification) */}
      {surat.status === "DIPROSES" && session?.user.role === "PERBEKEL" && (
        <div className="flex justify-end mt-8">
          <div className="flex gap-3">
            <TolakButton suratId={surat.id} />
            <TerimaButton
              suratId={surat.id}
              noSurat={surat.no_surat}
            />
          </div>
        </div>
      )}

      {surat.status === "DIPROSES" && session?.user.role === "ADMIN" ? (
        <Alert className="bg-teal-500/10 text-teal-600">
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Surat ini sedang dalam proses verifikasi dan proses tanda tangan
            oleh perbekel.
          </AlertDescription>
        </Alert>
      ) : null}
      {surat.status === "DITERIMA" && session?.user.role === "PERBEKEL" ? (
        <Alert className="bg-green-500/10 text-green-600">
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Surat ini menunggu pengambilan oleh pemohon.
          </AlertDescription>
        </Alert>
      ) : null}
      {surat.status === "DITOLAK" ? (
        <Alert className="bg-red-500/10 text-red-600">
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Surat ditolak dengan alasan: {surat.pesan_penolakan}
          </AlertDescription>
        </Alert>
      ) : null}
      {surat.status === "DIAMBIL" && surat.tanggal_pengambilan && (
        <Alert className="bg-blue-500/10 text-blue-600">
          <AlertTitle>Informasi</AlertTitle>
          <AlertDescription>
            Surat telah diambil warga pada tanggal:{" "}
            {format(new Date(surat.tanggal_pengambilan), "dd MMMM yyyy", {
              locale: id,
            })}
          </AlertDescription>
        </Alert>
      )}
    </DashboardContainer>
  );
}

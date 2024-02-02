"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { type Surat, type KategoriSurat } from "@prisma/client";
import SuratStatusBadge from "@/components/surat-status-badge";
import { formatEnumValue } from "@/lib/utils";
import format from "date-fns/format";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare, Info } from "lucide-react";
import { id } from "date-fns/locale";

const InfoContent = ({
  data,
}: {
  data: Surat & {
    kategori_surat: KategoriSurat;
  };
}) => {
  return (
    <div className="text-sm text-muted-foreground">
      <div className="space-y-1">
        <div className="py-2 px-2 bg-green-500/20 text-green-600 rounded-lg">
          Data Diri pada Surat
        </div>
        <p>
          <span className="font-semibold">Nama:</span> {data.nama}
        </p>
        <p>
          <span className="font-semibold">NIK:</span> {data.nik}
        </p>
        <p>
          <span className="font-semibold">NO KK:</span> {data.no_kk}
        </p>
        <p>
          <span className="font-semibold">Alamat:</span> {data.alamat}
        </p>
        <p>
          <span className="font-semibold">Agama:</span>{" "}
          {formatEnumValue(data.agama)}
        </p>
        <p>
          <span className="font-semibold">Kewarganegaraan:</span>{" "}
          {data.kewarganegaraan}
        </p>
        <p>
          <span className="font-semibold">Pekerjaan:</span> {data.pekerjaan}
        </p>
        <p>
          <span className="font-semibold">Tempat / Tanggal Lahir:</span>{" "}
          {data.tempat_lahir}
          {" / "}
          {format(data.tanggal_lahir, "dd MMMM yyyy", {
            locale: id,
          })}
        </p>
        <p>
          <span className="font-semibold">
            Jenis Kelamin / Status Perkawinan:
          </span>{" "}
          {data.jenis_kelamin ? "Laki-laki" : "Perempuan"}
          {" / "}
          {formatEnumValue(data.status_perkawinan)}
        </p>
      </div>
      <div className="space-y-1 mt-4">
        <div className="py-2 px-2 bg-blue-500/20 text-blue-600 rounded-lg">
          Data Surat Keterangan
        </div>
        <p>
          <span className="font-semibold">Nomor Surat:</span>{" "}
          {data?.no_surat ? data.no_surat : "-"}
        </p>
        <p className="flex gap-2">
          <span className="font-semibold">Status:</span>{" "}
          <SuratStatusBadge status={data.status} />
        </p>
        <p>
          <span className="font-semibold">Jenis Surat:</span>{" "}
          {data.kategori_surat.nama}
        </p>
        <p>
          <span className="font-semibold">Tanggal Pengajuan:</span>{" "}
          {format(data.createdAt, "dd MMMM yyyy", {
            locale: id,
          })}
        </p>
        <p>
          <span className="font-semibold">Keperluan:</span> {data.keperluan}
        </p>
        {data.kategori_surat.kode === "SKU" && (
          <>
            <p>
              <span className="font-semibold">Nama Usaha:</span>{" "}
              {data.nama_usaha}
            </p>
            <p>
              <span className="font-semibold">Lokasi Usaha:</span>{" "}
              {data.lokasi_usaha}
            </p>
          </>
        )}
        {data.kategori_surat.kode === "SKD" && (
          <p>
            <span className="font-semibold">Domisili:</span> {data.domisili}
          </p>
        )}
        {data.kategori_surat.kode === "SKTM" && (
          <p>
            <span className="font-semibold">Terdaftar di DTKS:</span>{" "}
            {data.dtks ? "Ya" : "Tidak"}
          </p>
        )}
        {data.status === "DIAMBIL" && data?.tanggal_pengambilan && (
          <p>
            <span className="font-semibold">Tanggal Pengambilan:</span>{" "}
            {format(data.tanggal_pengambilan, "dd MMMM yyyy", {
              locale: id,
            })}
          </p>
        )}
        {data.status === "DITOLAK" && data?.pesan_penolakan && (
          <p>
            <span className="font-semibold">Pesan Penolakan:</span>{" "}
            {data.pesan_penolakan}
          </p>
        )}
      </div>
    </div>
  );
};

const InfoDialog = ({
  data,
}: {
  data: Surat & {
    kategori_surat: KategoriSurat;
  };
}) => {
  return (
    <Dialog>
      <Button
        variant={"secondary"}
        size={"sm"}
        asChild
      >
        <DialogTrigger>
          <Info className="h-3 w-3 mr-1 -mt-0.5" />
          Detail
        </DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Informasi Surat</DialogTitle>
        </DialogHeader>
        <InfoContent data={data} />
      </DialogContent>
    </Dialog>
  );
};

export const pendingColumns: ColumnDef<
  Surat & {
    kategori_surat: KategoriSurat;
  }
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "tanggal pengajuan",
    accessorFn: ({ createdAt }) => {
      return createdAt;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Surat"
      />
    ),
    accessorKey: "Jenis Surat",
    accessorFn: (row) => {
      return row.kategori_surat.nama;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <SuratStatusBadge status={row.original.status} />;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return <InfoDialog data={row.original} />;
    },
  },
];

export const selesaiColumns: ColumnDef<
  Surat & {
    kategori_surat: KategoriSurat;
  }
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "tanggal pengajuan",
    accessorFn: ({ createdAt }) => {
      return createdAt;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    header: "Nomor Surat",
    accessorKey: "Nomor Surat",
    accessorFn: (row) => {
      return row.no_surat;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Surat"
      />
    ),
    accessorKey: "Jenis Surat",
    accessorFn: (row) => {
      return row.kategori_surat.nama;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <SuratStatusBadge status={row.original.status} />;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return <InfoDialog data={row.original} />;
    },
  },
];

export const ditolakColumns: ColumnDef<
  Surat & {
    kategori_surat: KategoriSurat;
  }
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "tanggal pengajuan",
    accessorFn: ({ createdAt }) => {
      return createdAt;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Surat"
      />
    ),
    accessorKey: "Jenis Surat",
    accessorFn: (row) => {
      return row.kategori_surat.nama;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <SuratStatusBadge status={row.original.status} />;
    },
  },
  {
    header: "Pesan Penolakan",

    cell: ({ row }) => {
      return (
        <div className="ml-[25%]">
          <Dialog>
            <Button
              variant={"outline"}
              size={"sm"}
              asChild
            >
              <DialogTrigger>
                <MessageSquare className="h-4 w-4" />
              </DialogTrigger>
            </Button>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Pesan Penolakan</DialogTitle>
                <DialogDescription>
                  {row.original.pesan_penolakan}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return <InfoDialog data={row.original} />;
    },
  },
];

export const diambilColumns: ColumnDef<
  Surat & {
    kategori_surat: KategoriSurat;
  }
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "tanggal pengajuan",
    accessorFn: ({ createdAt }) => {
      return createdAt;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    header: "Tanggal Pengambilan",
    accessorKey: "tanggal pengambilan",
    accessorFn: ({ tanggal_pengambilan }) => {
      return tanggal_pengambilan;
    },
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    header: "Nomor Surat",
    accessorKey: "Nomor Surat",
    accessorFn: (row) => {
      return row.no_surat;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Surat"
      />
    ),
    accessorKey: "Jenis Surat",
    accessorFn: (row) => {
      return row.kategori_surat.nama;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <SuratStatusBadge status={row.original.status} />;
    },
  },
  {
    header: "Aksi",
    cell: ({ row }) => {
      return <InfoDialog data={row.original} />;
    },
  },
];

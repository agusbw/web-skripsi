"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { type Surat, type KategoriSurat } from "@prisma/client";
import SuratStatusBadge from "@/components/surat-status-badge";
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
    <div className="space-y-1 py-2 text-sm text-muted-foreground">
      <div>
        <span className="font-semibold">Nomor Surat:</span>{" "}
        {data?.no_surat ? data.no_surat : "-"}
      </div>
      <div>
        <span className="font-semibold">Jenis Surat:</span>{" "}
        {data.kategori_surat.nama}
      </div>
      <div>
        <span className="font-semibold">Tanggal Pengajuan:</span>{" "}
        {format(data.createdAt, "dd MMMM yyyy", {
          locale: id,
        })}
      </div>
      <div>
        <span className="font-semibold">Keperluan:</span> {data.keperluan}
      </div>
      {data.kategori_surat.kode === "SKU" && (
        <>
          <div>
            <span className="font-semibold">Nama Usaha:</span> {data.nama_usaha}
          </div>
          <div>
            <span className="font-semibold">Lokasi Usaha:</span>{" "}
            {data.lokasi_usaha}
          </div>
        </>
      )}
      {data.kategori_surat.kode === "SKD" && (
        <div>
          <span className="font-semibold">Domisili:</span> {data.domisili}
        </div>
      )}
      {data.kategori_surat.kode === "SKTM" && (
        <div>
          <span className="font-semibold">Terdaftar di DTKS:</span>{" "}
          {data.dtks ? "Ya" : "Tidak"}
        </div>
      )}
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
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tanggal Pengajuan"
      />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tanggal Pengajuan"
      />
    ),
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

export const ditolakColumns: ColumnDef<
  Surat & {
    kategori_surat: KategoriSurat;
  }
>[] = [
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tanggal Pengajuan"
      />
    ),
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

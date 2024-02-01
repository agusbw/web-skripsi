"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";
import type { Surat, KategoriSurat } from "@prisma/client";
import SuratStatusBadge from "@/components/surat-status-badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import format from "date-fns/format";
import { id } from "date-fns/locale";

export const pendingColumns: ColumnDef<
  {
    warga: {
      nik: string;
      nama: string;
      user: {
        id: string;
      };
    };
    kategori_surat: KategoriSurat;
  } & Surat
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "Tanggal Pengajuan",
    accessorFn: (row) => {
      return format(row.createdAt, "dd MMMM yyyy", {
        locale: id,
      });
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NIK Pengaju"
      />
    ),
    accessorKey: "NIK Pengaju",
    accessorFn: (row) => {
      return row.warga.nik;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama Pengaju"
      />
    ),
    accessorKey: "Nama Pengaju",
    accessorFn: (row) => {
      return row.warga.nama;
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
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <Button
            variant={"secondary"}
            size={"sm"}
            asChild
          >
            <Link href={`/admin/pengajuan/${row.original.id}`}>Detail</Link>
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      );
    },
  },
];

export const selesaiColumns: ColumnDef<
  {
    warga: {
      nik: string;
      nama: string;
      user: {
        id: string;
      };
    };
    kategori_surat: KategoriSurat;
  } & Surat
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "Tanggal Pengajuan",
    accessorFn: (row) => {
      return format(row.createdAt, "dd MMMM yyyy", {
        locale: id,
      });
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NIK Pengaju"
      />
    ),
    accessorKey: "NIK Pengaju",
    accessorFn: (row) => {
      return row.warga.nik;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama Pengaju"
      />
    ),
    accessorKey: "Nama Pengaju",
    accessorFn: (row) => {
      return row.warga.nama;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nomor Surat"
      />
    ),
    accessorKey: "Nomor Surat",
    accessorFn: (row) => {
      return row.no_surat ? row.no_surat : "-";
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
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <Button
            variant={"secondary"}
            size={"sm"}
            asChild
          >
            <Link href={`/admin/pengajuan/${row.original.id}`}>Detail</Link>
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      );
    },
  },
];

export const ditolakColumns: ColumnDef<
  {
    warga: {
      nik: string;
      nama: string;
      user: {
        id: string;
      };
    };
    kategori_surat: KategoriSurat;
  } & Surat
>[] = [
  {
    header: "Tanggal Pengajuan",
    accessorKey: "Tanggal Pengajuan",
    accessorFn: (row) => {
      return format(row.createdAt, "dd MMMM yyyy", {
        locale: id,
      });
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NIK Pengaju"
      />
    ),
    accessorKey: "NIK Pengaju",
    accessorFn: (row) => {
      return row.warga.nik;
    },
  },
  {
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama Pengaju"
      />
    ),
    accessorKey: "Nama Pengaju",
    accessorFn: (row) => {
      return row.warga.nama;
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
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <Button
            variant={"secondary"}
            size={"sm"}
            asChild
          >
            <Link href={`/admin/pengajuan/${row.original.id}`}>Detail</Link>
          </Button>
          <Button
            variant={"destructive"}
            size={"sm"}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      );
    },
  },
];

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";
import type { Surat, KategoriSurat } from "@prisma/client";
import SuratStatusBadge from "@/components/surat-status-badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/pengajuan/${row.original.id}`}>
                Proses Surat
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                className="w-full"
                size={"sm"}
              >
                Hapus Surat
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/pengajuan/${row.original.id}`}>
                Detail Surat
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Sudah Diambil</DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                className="w-full"
                size={"sm"}
              >
                Hapus Surat
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/pengajuan/${row.original.id}`}>
                Detail Surat
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant={"destructive"}
                className="w-full"
                size={"sm"}
              >
                Hapus Surat
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

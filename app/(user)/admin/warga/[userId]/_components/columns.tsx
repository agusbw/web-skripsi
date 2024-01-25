"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Surat, KategoriSurat } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import SuratStatusBadge from "@/components/surat-status-badge";

export const columns: ColumnDef<
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
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
      />
    ),
    cell: ({ row }) => {
      return <SuratStatusBadge status={row.original.status} />;
    },
  },
  {
    header: "Aksi",
  },
];

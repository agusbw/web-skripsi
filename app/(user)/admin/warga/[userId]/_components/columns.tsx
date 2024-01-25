"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Surat, KategoriSurat } from "@prisma/client";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { formatEnumValue, getBadgeVariant } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
      const badgeColor = getBadgeVariant(row.original.status);

      return (
        <Badge
          variant={badgeColor}
          className="rounded-full flex items-center justify-center w-fit"
        >
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full mr-1",
              badgeColor === "outline" ? "bg-black" : "bg-white"
            )}
          ></div>
          <div>{formatEnumValue(row.original.status)}</div>
        </Badge>
      );
    },
  },
  {
    header: "Aksi",
  },
];

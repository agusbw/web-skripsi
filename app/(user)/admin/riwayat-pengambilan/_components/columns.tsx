"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import type { Surat, KodeSurat } from "@prisma/client";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";

export const riwayatPengambilanColumns: ColumnDef<
  {
    warga: {
      nik: string;
      nama: string;
      user: {
        id: string;
      };
    };
    kategori_surat: {
      id: string;
      nama: string;
      kode: KodeSurat;
    };
  } & Surat
>[] = [
  {
    accessorKey: "nik",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="NIK"
      />
    ),
    cell: ({ row }) => {
      return <span className="font-semibold">{row.original.nik}</span>;
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Nama"
      />
    ),
  },
  {
    accessorKey: "kategori_surat.nama",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Jenis Surat"
      />
    ),
  },
  {
    accessorKey: "tanggal pengajuan",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tanggal Pengajuan"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {format(row.original.createdAt, "d MMMM yyyy", {
            locale: id,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: "tanggal_pengambilan",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Tanggal Pengambilan"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {row.original.tanggal_pengambilan
            ? format(row.original?.tanggal_pengambilan, "d MMMM yyyy", {
                locale: id,
              })
            : "-"}
        </span>
      );
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

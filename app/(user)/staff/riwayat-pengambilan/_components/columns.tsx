"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  type ColumnDefProps,
  DeleteSuratButton,
} from "../../pengajuan/_components/columns";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";

export const riwayatPengambilanColumns: ColumnDef<ColumnDefProps>[] = [
  {
    header: "NIK Pengaju",
    accessorKey: "NIK Pengaju",
    accessorFn: (row) => {
      return row.warga.nik;
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
    accessorKey: "tanggal pengajuan",
    header: "Tanggal Pengajuan",
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
    accessorKey: "Tanggal Pengambilan",
    header: "Tanggal Pengambilan",
    accessorFn: (row) => {
      return row.tanggal_pengambilan;
    },
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
      const session = useSession();

      return (
        <div className="flex gap-3">
          <Button
            variant={"secondary"}
            size={"sm"}
            asChild
          >
            <Link href={`/staff/pengajuan/${row.original.id}`}>Detail</Link>
          </Button>
          {session.data?.user.role === "ADMIN" && (
            <DeleteSuratButton
              size={"sm"}
              suratId={row.original.id}
            />
          )}
        </div>
      );
    },
  },
];

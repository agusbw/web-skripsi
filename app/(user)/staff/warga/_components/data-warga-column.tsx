"use client";

import { DataTableColumnHeader } from "@/components/data-table-column-header";
import type { ColumnDef } from "@tanstack/react-table";
import { formatEnumValue } from "@/lib/utils";
import { DeleteWarga } from "./delete-warga-button";
import type { Warga } from "@prisma/client";
import UpdateWarga from "./create-warga-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export const listWargaColumns: ColumnDef<Warga>[] = [
  {
    accessorKey: "nik",
    header: "NIK",
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
    accessorKey: "pekerjaan",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Pekerjaan"
      />
    ),
    cell: ({ row }) => {
      return (
        <span>{row.original?.pekerjaan ? row.original.pekerjaan : "-"}</span>
      );
    },
  },
  {
    accessorKey: "agama",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Agama"
      />
    ),
    cell: ({ row }) => {
      return (
        <span className="capitalize">
          {formatEnumValue(row.original.agama)}
        </span>
      );
    },
  },
  {
    accessorKey: "status_perkawinan",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status Perkawinan"
      />
    ),
    cell: ({ row }) => {
      return <span>{formatEnumValue(row.original.status_perkawinan)}</span>;
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
            <Link href={`/staff/warga/${row.original.id_user}`}>
              <User className="w-3 h-3" />
            </Link>
          </Button>
          <UpdateWarga
            variant="outline"
            warga={row.original}
          />
          <DeleteWarga id={row.original.id} />
        </div>
      );
    },
  },
];

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type Penandatangan } from "@prisma/client";
import UpdatePenandatanganButton from "./update-button";
import DeletePenandatanganButton from "./delete-button";

export const penandatanganColumns: ColumnDef<Penandatangan>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
  },
  {
    accessorKey: "alamat",
    header: "Alamat",
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <UpdatePenandatanganButton penandatangan={row.original} />
          <DeletePenandatanganButton id={row.original.id} />
        </div>
      );
    },
  },
];

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import Link from "next/link";
import type { Surat, KategoriSurat } from "@prisma/client";
import { useTransition, useState, type ReactNode } from "react";
import SuratStatusBadge from "@/components/surat-status-badge";
import { useRouter } from "next/navigation";
import { deleteSurat } from "@/lib/actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, UserCheck } from "lucide-react";
import DiambilButton from "../[suratId]/_components/diambil-button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import format from "date-fns/format";
import { id } from "date-fns/locale";

export type ColumnDefProps = {
  warga: {
    nik: string;
    nama: string;
    user: {
      id: string;
    };
  };
  kategori_surat: KategoriSurat;
} & Surat;

export function DeleteSuratButton({
  suratId,
  size = "default",
  children,
  pushUrl,
}: {
  suratId: string;
  children?: ReactNode;
  size?: "default" | "sm" | "lg" | "icon" | null | undefined;
  pushUrl?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  async function handleDelete(id_surat: string) {
    startTransition(async () => {
      const res = await deleteSurat(id_surat);
      if (res.success) {
        toast.success("Sukses", {
          description: res.message,
        });
        if (pushUrl) router.push(pushUrl);
      } else {
        toast.error("Gagal", {
          description: res.message,
        });
      }
      setIsOpen(false);
    });
  }

  return (
    <AlertDialog open={isOpen}>
      <Button
        variant={"destructive"}
        size={size}
        onClick={() => setIsOpen(true)}
      >
        {children ? children : <Trash2 size={15} />}
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Yakin menghapus data surat?</AlertDialogTitle>
          <AlertDialogDescription>
            Data pengajuan surat yang dihapus tidak dapat dikembalikan. Pastikan
            data yang dihapus tidak diperlukan lagi.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"outline"}
            onClick={() => setIsOpen(false)}
          >
            Batal
          </Button>
          <Button
            variant={"destructive"}
            onClick={() => handleDelete(suratId)}
            disabled={pending}
            className="mb-2 sm:mb-0"
          >
            {pending ? (
              <Loader2
                size={15}
                className="animate-spin mr-1"
              />
            ) : null}
            Hapus
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export const pendingColumns: ColumnDef<ColumnDefProps>[] = [
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
          <DeleteSuratButton
            size={"sm"}
            suratId={row.original.id}
          />
        </div>
      );
    },
  },
];

export const selesaiColumns: ColumnDef<ColumnDefProps>[] = [
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
          <DiambilButton
            noSurat={row.original.no_surat}
            suratId={row.original.id}
            size={"sm"}
          >
            <UserCheck className="w-4 h-4" />
          </DiambilButton>
          <DeleteSuratButton
            size={"sm"}
            suratId={row.original.id}
          />
        </div>
      );
    },
  },
];

export const ditolakColumns: ColumnDef<ColumnDefProps>[] = [
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
          <DeleteSuratButton
            size={"sm"}
            suratId={row.original.id}
          />
        </div>
      );
    },
  },
];

"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { type Surat, type KategoriSurat } from "@prisma/client";
import format from "date-fns/format";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { useMediaQuery } from "@uidotdev/usehooks";

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
      return createdAt as Date;
    },

    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt as Date, "dd/MM/yyyy")}
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
    accessorKey: "keperluan",
    header: "Keperluan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge className="rounded-full capitalize bg-yellow-400 hover:bg-yellow-400">
          {row.original.status}
        </Badge>
      );
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
      return createdAt as Date;
    },

    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt as Date, "dd/MM/yyyy")}
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
    accessorKey: "keperluan",
    header: "Keperluan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge className="rounded-full capitalize bg-green-400 hover:bg-green-400">
          {row.original.status}
        </Badge>
      );
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
      return createdAt as Date;
    },

    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {format(row.original.createdAt as Date, "dd/MM/yyyy")}
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
    accessorKey: "keperluan",
    header: "Keperluan",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className="rounded-full capitalize"
          variant={"destructive"}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    header: "Pesan Penolakan",
    cell: ({ row }) => {
      const isSmallDevice = useMediaQuery(
        "only screen and (max-width : 768px)"
      );

      if (isSmallDevice) {
        return (
          <Drawer>
            <Button
              variant={"outline"}
              size={"sm"}
              asChild
            >
              <DrawerTrigger>
                <MessageSquare className="h-4 w-4" />
              </DrawerTrigger>
            </Button>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Pesan Penolakan</DrawerTitle>
                <DrawerDescription>{row.original.pesan}</DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        );
      }

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
              <DialogDescription>{row.original.pesan}</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { Printer } from "lucide-react";
import type { Surat, KodeSurat } from "@prisma/client";

type Props = {
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
} & Surat;

export default function ExportPDF({ data }: { data: Props[] }) {
  function exportPDF() {
    const rows = data.map((data) => {
      const tanggalAmbil = data?.tanggal_pengambilan
        ? format(new Date(data.tanggal_pengambilan), "dd MMMM yyyy", {
            locale: id,
          })
        : "-";

      return [
        data.warga.nik,
        data.warga.nama,
        data.kategori_surat.nama,
        format(new Date(data.createdAt), "dd MMMM yyyy", {
          locale: id,
        }),
        tanggalAmbil,
      ];
    });

    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "NIK",
          "Nama",
          "Jenis Surat",
          "Tanggal Pengajuan",
          "Tanggal Pengambilan",
        ],
      ],
      body: rows,
      foot: [["Total", "", "", "", rows.length]],
      theme: "grid",
    });

    doc.save("data-pengambilan-surat.pdf");
  }

  return (
    <div>
      <Button
        variant={"secondary"}
        onClick={exportPDF}
      >
        <Printer className="w-4 h-4 mr-1" /> | Print Data
      </Button>
    </div>
  );
}

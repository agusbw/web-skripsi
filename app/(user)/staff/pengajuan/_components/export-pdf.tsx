"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { Printer } from "lucide-react";
import type { Surat, KategoriSurat } from "@prisma/client";
import { formatEnumValue } from "@/lib/utils";

type Props = {
  warga: {
    nik: string;
    nama: string;
    user: {
      id: string;
    };
  };
  kategori_surat: KategoriSurat;
} & Surat;

export default function ExportPDF({ data }: { data: Props[] }) {
  function exportPDF() {
    const rows = data.map((data) => {
      const noSurat = data.no_surat ? data.no_surat : "-";

      return [
        format(new Date(data.createdAt), "dd MMMM yyyy", {
          locale: id,
        }),
        data.warga.nik,
        data.warga.nama,
        data.kategori_surat.nama,
        noSurat,
        formatEnumValue(data.status),
      ];
    });

    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Tanggal Pengajuan",
          "NIK",
          "Nama",
          "Jenis Surat",
          "Nomor Surat",
          "Status",
        ],
      ],
      body: rows,
      foot: [["Total", "", "", "", rows.length]],
      theme: "grid",
    });

    doc.save("semua-data-pengajuan-surat.pdf");
  }

  return (
    <div>
      <Button
        variant={"secondary"}
        onClick={exportPDF}
      >
        <Printer className="w-4 h-4 mr-1" /> | Unduh Data Surat
      </Button>
    </div>
  );
}

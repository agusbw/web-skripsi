"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

export default function ExportPDF({
  data,
}: {
  data: {
    SKTM: {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
    SKU: {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
    SKBPK: {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
    SKD: {
      total: number;
      pending: number;
      selesai: number;
      ditolak: number;
    };
  };
}) {
  function exportPDF() {
    const { SKU, SKBPK, SKD, SKTM } = data;

    const rows = [
      [
        "Surat Keterangan Tidak Mampu",
        SKTM.total,
        SKTM.pending,
        SKTM.selesai,
        SKTM.ditolak,
      ],
      [
        "Surat Keterangan Usaha",
        SKU.total,
        SKU.pending,
        SKU.selesai,
        SKU.ditolak,
      ],
      [
        "Surat Keterangan Domisili",
        SKD.total,
        SKD.pending,
        SKD.selesai,
        SKD.ditolak,
      ],
      [
        "Surat Keterangan Belum Pernah Kawin",
        SKBPK.total,
        SKBPK.pending,
        SKBPK.selesai,
        SKBPK.ditolak,
      ],
    ];

    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        ["Jenis Surat", "Jumlah Pengajuan", "Pending", "Selesai", "Ditolak"],
      ],
      body: rows,
      foot: [
        [
          "Total",
          SKTM.total + SKBPK.total + SKU.total + SKD.total,
          SKTM.pending + SKU.pending + SKD.pending + SKBPK.pending,
          SKTM.selesai + SKU.selesai + SKD.selesai + SKBPK.selesai,
          SKTM.ditolak + SKU.ditolak + SKD.ditolak + SKBPK.ditolak,
        ],
      ],
      theme: "grid",
    });

    doc.save("data-jenis-surat.pdf");
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

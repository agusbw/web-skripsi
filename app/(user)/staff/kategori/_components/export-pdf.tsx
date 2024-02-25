"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

type SurstStatus = {
  total: number;
  pending: number;
  diproses: number;
  diterima: number;
  diambil: number;
  ditolak: number;
};

export default function ExportPDF({
  data,
}: {
  data: {
    SKTM: SurstStatus;
    SKU: SurstStatus;
    SKBPK: SurstStatus;
    SKD: SurstStatus;
  };
}) {
  function exportPDF() {
    const { SKU, SKBPK, SKD, SKTM } = data;

    const rows = [
      [
        "Surat Keterangan Tidak Mampu",
        SKTM.total,
        SKTM.pending,
        SKTM.diproses,
        SKTM.diterima,
        SKTM.diambil,
        SKTM.ditolak,
      ],
      [
        "Surat Keterangan Usaha",
        SKU.total,
        SKU.pending,
        SKU.diproses,
        SKU.diterima,
        SKU.diambil,
        SKU.ditolak,
      ],
      [
        "Surat Keterangan Domisili",
        SKD.total,
        SKD.pending,
        SKD.diproses,
        SKD.diterima,
        SKD.diambil,
        SKD.ditolak,
      ],
      [
        "Surat Keterangan Belum Pernah Kawin",
        SKBPK.total,
        SKBPK.pending,
        SKBPK.diproses,
        SKBPK.diterima,
        SKBPK.diambil,
        SKBPK.ditolak,
      ],
    ];

    const doc = new jsPDF();
    autoTable(doc, {
      head: [
        [
          "Jenis Surat",
          "Jumlah Pengajuan",
          "Pending",
          "Diproses",
          "Diterima",
          "Diambil",
          "Ditolak",
        ],
      ],
      body: rows,
      foot: [
        [
          "Total",
          SKTM.total + SKBPK.total + SKU.total + SKD.total,
          SKTM.pending + SKU.pending + SKD.pending + SKBPK.pending,
          SKTM.diproses + SKU.diproses + SKD.diproses + SKBPK.diproses,
          SKTM.diterima + SKU.diterima + SKD.diterima + SKBPK.diterima,
          SKTM.diambil + SKU.diambil + SKD.diambil + SKBPK.diambil,
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
        <Printer className="w-4 h-4 mr-1" /> | Unduh Data
      </Button>
    </div>
  );
}

"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";
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
  startDate,
  endDate,
}: {
  data: {
    SKTM: SurstStatus;
    SKU: SurstStatus;
    SKBPK: SurstStatus;
    SKD: SurstStatus;
  };
  startDate: Date | null;
  endDate: Date | null;
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
      startY: 40,
      margin: { horizontal: 10, bottom: 30, top: 35 },
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
      didDrawPage: function (data) {
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(
          "Sistem Informasi Pengajuan Surat Keterangan Desa Pelapuan",
          data.settings.margin.left,
          22
        );

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(
          "Laporan Jumlah Pengajuan Surat",
          data.settings.margin.left,
          28
        );

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        if (!startDate || !endDate) {
          doc.text("Periode: Seluruh periode", data.settings.margin.left, 34);
        } else {
          doc.text(
            `Periode: ${format(startDate, "dd MMMM yyyy", {
              locale: id,
            })} - ${format(endDate, "dd MMMM yyyy", {
              locale: id,
            })}`,
            data.settings.margin.left,
            34
          );
        }
        const img = new Image();
        img.src = "/logo-desa.png";
        doc.addImage(img, "PNG", 180, 15, 15, 15);

        doc.text(
          "Dicetak Tanggal: " +
            format(new Date(), "dd MMMM yyyy", { locale: id }),
          data.settings.margin.left,
          285
        );
      },
    });

    doc.save("Laporan Jumlah Pengajuan Surat SIPSK Desa Pelapuan.pdf");
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

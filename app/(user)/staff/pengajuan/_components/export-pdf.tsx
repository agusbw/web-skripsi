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

export default function ExportPDF({
  data,
  startDate,
  endDate,
}: {
  data: Props[];
  startDate: Date | null;
  endDate: Date | null;
}) {
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
      startY: 40,
      margin: { horizontal: 10, bottom: 30, top: 35 },
      body: rows,
      foot: [["Total", "", "", "", rows.length]],
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
        doc.text("Laporan Data Pengajuan Surat", data.settings.margin.left, 28);

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

    const periodString =
      startDate && endDate
        ? `(${
            format(startDate, "dd-MM-yyyy") +
            " - " +
            format(endDate, "dd-MM-yyyy")
          })`
        : null;

    doc.save(
      `Data Pengajuan Surat SIPSK Desa Pelapuan ${
        periodString ? periodString : ""
      }.pdf`
    );
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

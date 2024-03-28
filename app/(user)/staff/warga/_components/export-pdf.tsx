"use client";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Button } from "@/components/ui/button";
import format from "date-fns/format";
import id from "date-fns/locale/id";
import { Printer } from "lucide-react";
import type { Warga, Surat } from "@prisma/client";

export default function ExportPDF({
  data,
}: {
  data: (Warga & { surat: Surat[] })[];
}) {
  function exportPDF() {
    const rows = data.map((warga) => [
      warga.nik,
      warga.nama,
      warga.alamat,
      format(new Date(warga.tanggal_lahir), "dd MMMM yyyy", {
        locale: id,
      }),
      warga.surat.length,
    ]);

    const doc = new jsPDF();
    autoTable(doc, {
      startY: 35,
      margin: { horizontal: 10, bottom: 30, top: 35 },
      head: [["NIK", "Nama", "Alamat", "Tanggal Lahir", "Total Pengajuan"]],
      body: rows,
      theme: "grid",
      foot: [["Total", "", "", "", rows.length]],
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
        doc.text("Laporan Data Warga", data.settings.margin.left, 28);

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

    doc.save(
      `${format(new Date(), "dd-MM-yyyy", {
        locale: id,
      })} - Data Warga SIPSK Desa Pelapuan.pdf`
    );
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

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
      head: [["NIK", "Nama", "Alamat", "Tanggal Lahir", "Total Pengajuan"]],
      body: rows,
      theme: "grid",
      foot: [["Total", "", "", "", rows.length]],
    });

    doc.save("data-warga.pdf");
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

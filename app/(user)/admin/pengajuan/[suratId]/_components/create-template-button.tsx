"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { PDFDocument, type PDFForm, type PDFFont } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import type { Surat, KategoriSurat, KodeSurat } from "@prisma/client";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import format from "date-fns/format";
import { formatEnumValue } from "@/lib/utils";
import id from "date-fns/locale/id";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  data: Surat & {
    kategori_surat: KategoriSurat;
    warga: {
      user: {
        id: string;
      };
      nik: string;
      nama: string;
    };
  };
  pdf: Buffer;
};

function setPdfText(
  kodeSurat: KodeSurat,
  data: Props["data"],
  form: PDFForm,
  font: PDFFont
) {
  form.getTextField("no_surat").setText(data.no_surat ? data.no_surat : "");
  form.getTextField("nama").setText(data.nama);
  form.getTextField("nik").setText(data.nik);
  form.getTextField("ttl").setText(
    `${data.tempat_lahir}/${format(data.tanggal_lahir, "dd MMMM yyyy", {
      locale: id,
    })}`
  );
  form
    .getTextField("jenis_kelamin")
    .setText(data.jenis_kelamin ? "Laki-laki" : "Perempuan");
  form.getTextField("kewarganegaraan").setText(data.kewarganegaraan);
  form.getTextField("agama").setText(formatEnumValue(data.agama));
  form.getTextField("pekerjaan").setText(data.pekerjaan ? data.pekerjaan : "-");
  form.getTextField("alamat").setText(data.alamat);
  form.getTextField("keperluan").setText(data.keperluan);
  form
    .getTextField("tanggal_ttd")
    .setText(format(new Date(), "dd MMMM yyyy", { locale: id }));

  if (kodeSurat === "SKD") {
    form.getTextField("keterangan")
      .setText(`Memang benar yang Tersebut Diatas bertempat tinggal ( berdomisili) di ${
      data.domisili ? data.domisili : ""
    }
    `);
  }

  if (kodeSurat === "SKU") {
    form.getTextField("keterangan")
      .setText(`Memang benar yang tersebut diatas memiliki usaha ${
      data.nama_usaha ? `"${data.nama_usaha}"` : ""
    } yang berlokasi di wilayah ${data.lokasi_usaha ? data.lokasi_usaha : ""}
    `);
  }

  form.updateFieldAppearances(font);
}

function CreateTemplateButton({ data, className, pdf }: Props) {
  const [loading, setLoading] = React.useState(false);

  const fillForm = async (pdf: Buffer) => {
    setLoading(true);
    // ambil fontnya dari api
    const fontUrl = "/api/font";
    const fontBytes = await fetch(fontUrl).then((res) => res.arrayBuffer());

    // @ts-expect-error this erros is expected, we cant check the type
    const pdfData = new Uint8Array(pdf.data);

    // Step 1: Load the PDF yang berisi form fields (didapat dari props)
    const pdfDoc = await PDFDocument.load(pdfData);
    pdfDoc.registerFontkit(fontkit);
    const bookmanFont = await pdfDoc.embedFont(fontBytes);

    // Step 2: Dapetin form fieldnnya
    const form = pdfDoc.getForm();

    // Step 3: Isi form fieldnya
    setPdfText(data.kategori_surat.kode, data, form, bookmanFont);

    // Step 4: Save PDF yang sudah diisi form fieldnya
    form.flatten(); //flat the form field
    const pdfBytes = await pdfDoc.save();

    // Step 5: Buat Blob dari PDF yang sudah diisi form fieldnya
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    // Step 6: Bikin URL untuk download atau preview
    const url = URL.createObjectURL(blob);

    setLoading(false);

    // Step 7: Bikin link element dan trigger click event untuk download
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";

    // link.download = `SKBPK_${data.kategori_surat.nama}_${data.nama}.pdf`;

    link.click();
  };
  return (
    <Button
      size={"sm"}
      variant={"outline"}
      className={cn(className)}
      disabled={loading}
      onClick={async () => {
        if (!data.no_surat) {
          toast.error("Harap isi nomor surat terlebih dahulu!");
          return;
        }
        await fillForm(pdf);
      }}
    >
      {!loading ? (
        <Download
          size={16}
          className="mr-1"
        />
      ) : (
        <Loader2
          size={16}
          className="mr-1 animate-spin"
        />
      )}{" "}
      | Unduh Template Surat
    </Button>
  );
}

export default CreateTemplateButton;

import format from "date-fns/format";
import { formatEnumValue } from "@/lib/utils";
import { id } from "date-fns/esm/locale";
import { type Warga } from "@prisma/client";
import DataItem from "@/components/data-item-field";

export default async function WargaBiodata({ warga }: { warga: Warga }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DataItem
          label="NIK"
          value={warga.nik}
        />
        <DataItem
          label="No KK"
          value={warga.no_kk}
        />
        <DataItem
          label="Nama"
          value={warga.nama}
        />
        <DataItem
          label="Tempat & Tanggal Lahir"
          value={`${warga.tempat_lahir}, ${format(
            new Date(warga.tanggal_lahir),
            "dd MMMM yyyy",
            {
              locale: id,
            }
          )}`}
        />
        <DataItem
          label="Jenis Kelamin"
          value={warga.jenis_kelamin ? "Laki-laki" : "Perempuan"}
        />
        <DataItem
          label="Agama"
          value={formatEnumValue(warga.agama)}
        />
        <DataItem
          label="Kewarganegaraan"
          value={warga.kewarganegaraan}
        />
        <DataItem
          label="Pekerjaan"
          value={warga.pekerjaan ? warga.pekerjaan : "-"}
        />
        <DataItem
          label="Status Perkawinan"
          value={formatEnumValue(warga.status_perkawinan)}
        />
      </div>
    </div>
  );
}

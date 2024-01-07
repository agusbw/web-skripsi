import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ADMIN_WHATSAPP_NUMBER } from "@/lib/constant";
import { getUserBiodata } from "@/lib/data";
import format from "date-fns/format";
import { formatEnumValue } from "@/lib/utils";

function DataItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <Label>{label}: </Label>
      <div className="p-2 bg-accent text-accent-foreground border cursor-not-allowed">
        <p className="text-sm">{value ? value : "-"}</p>
      </div>
    </div>
  );
}

export default async function UserData() {
  const userBiodata = await getUserBiodata();

  if (!userBiodata) return;

  return (
    <div>
      <p className="font-medium">Data Pengaju Surat</p>
      <p className="text-sm text-muted-foreground mb-4">
        Apabila terdapat kesalahan data pengaju,{" "}
        <Link
          className="text-primary hover:underline"
          href={`https://wa.me/${ADMIN_WHATSAPP_NUMBER}`}
        >
          hubungi admin
        </Link>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <DataItem
          label="NIK"
          value={userBiodata.nik}
        />
        <DataItem
          label="No KK"
          value={userBiodata.no_kk}
        />
        <DataItem
          label="Nama"
          value={userBiodata.nama}
        />
        <DataItem
          label="Tempat & Tanggal Lahir"
          value={`${userBiodata.tempat_lahir}, ${format(
            new Date(userBiodata.tanggal_lahir),
            "dd MMMM yyyy"
          )}`}
        />
        <DataItem
          label="Jenis Kelamin"
          value={userBiodata.jenis_kelamin ? "Laki-laki" : "Perempuan"}
        />
        <DataItem
          label="Agama"
          value={formatEnumValue(userBiodata.agama)}
        />
        <DataItem
          label="Kewarganegaraan"
          value={userBiodata.kewarganegaraan}
        />
        <DataItem
          label="Pekerjaan"
          value={userBiodata.pekerjaan ? userBiodata.pekerjaan : "-"}
        />
        <DataItem
          label="Status Perkawinan"
          value={formatEnumValue(userBiodata.status_perkawinan)}
        />
      </div>
    </div>
  );
}

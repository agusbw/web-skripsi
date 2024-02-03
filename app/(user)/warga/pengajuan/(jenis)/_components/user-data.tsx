import { Label } from "@/components/ui/label";
import { getUserBiodata } from "@/lib/server/data";
import format from "date-fns/format";
import { formatEnumValue } from "@/lib/utils";
import { id } from "date-fns/esm/locale";
import { Skeleton } from "@/components/ui/skeleton";
import DataItem from "@/components/data-item-field";

export default async function UserData() {
  const userBiodata = await getUserBiodata();

  if (!userBiodata) return;

  return (
    <div>
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
            "dd MMMM yyyy",
            {
              locale: id,
            }
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

export function UserDataSkeleton() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>NIK: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
        <div>
          <Label>Nama: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Jenis Kelamin: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Kewarganegaraan: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Status Perkawinan: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>No KK: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Tempat & Tanggal Lahir: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Agama: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>{" "}
        <div>
          <Label>Pekerjaan: </Label>
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
      </div>
    </div>
  );
}

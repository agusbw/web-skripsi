import { type Status } from "@prisma/client";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import Image from "next/image";
import SuratStatusBadge from "@/components/surat-status-badge";

export async function UserLatestRequest({
  data,
}: {
  data: {
    createdAt: Date;
    status: Status;
    kategori_surat: {
      nama: string;
    };
  }[];
}) {
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="no data"
          width={100}
          height={100}
          src={"/no-data.svg"}
        />
        <div className="text-muted-foreground text-center text-sm mt-4 px-10">
          Belum ada surat yang diajukan
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data?.map((surat, index) => (
        <div
          className="flex items-center"
          key={index}
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {surat?.kategori_surat.nama}
            </p>
            <p className="text-sm text-muted-foreground">
              {format(surat.createdAt, "dd MMMM yyyy", {
                locale: id,
              })}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <SuratStatusBadge status={surat.status} />
          </div>
        </div>
      ))}
    </div>
  );
}

export async function AdminLatestRequest({
  data,
}: {
  data: {
    warga: {
      nama: string;
    };
    status: Status;
    createdAt: Date;
    kategori_surat: {
      nama: string;
    };
  }[];
}) {
  if (data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Image
          alt="no data"
          width={100}
          height={100}
          src={"/no-data.svg"}
        />
        <div className="text-muted-foreground text-center text-sm mt-4 px-10">
          Belum ada surat yang diajukan
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {data?.map((surat, index) => (
        <div key={index}>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              {surat?.kategori_surat.nama}
            </p>
            <p className="text-xs font-medium leading-none text-muted-foreground line-clamp-1">
              {surat?.warga.nama}
            </p>
            <div className="flex justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                {format(surat.createdAt, "dd MMMM yyyy", {
                  locale: id,
                })}
              </p>
              <SuratStatusBadge status={surat?.status} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

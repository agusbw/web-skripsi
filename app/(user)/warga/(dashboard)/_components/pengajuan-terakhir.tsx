import { fetchUserLatestSurat } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import Image from "next/image";
import SuratStatusBadge from "@/components/surat-status-badge";

export async function PengajuanTerakhir() {
  const latestSurat = await fetchUserLatestSurat();

  if (latestSurat?.length === 0) {
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
      {latestSurat?.map((surat, index) => (
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

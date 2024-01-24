import { Badge } from "@/components/ui/badge";
import { fetchLatestSurat } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { formatEnumValue } from "@/lib/utils";
import Image from "next/image";

export async function PengajuanTerakhir() {
  const latestSurat = await fetchLatestSurat();

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
              <Badge
                variant={
                  surat?.status === "SELESAI"
                    ? "default"
                    : surat?.status === "PENDING"
                    ? "outline"
                    : "destructive"
                }
              >
                {formatEnumValue(surat?.status)}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

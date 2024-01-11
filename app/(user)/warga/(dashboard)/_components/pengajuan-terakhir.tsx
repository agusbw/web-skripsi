import { Badge } from "@/components/ui/badge";
import { fetchUserLatestSurat } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { formatEnumValue } from "@/lib/utils";

export async function PengajuanTerakhir() {
  const latestSurat = await fetchUserLatestSurat();
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
      ))}
    </div>
  );
}

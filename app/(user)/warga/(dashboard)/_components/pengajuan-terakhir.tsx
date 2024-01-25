import { Badge } from "@/components/ui/badge";
import { fetchUserLatestSurat } from "@/lib/data";
import format from "date-fns/format";
import { id } from "date-fns/locale";
import { formatEnumValue, getBadgeVariant, cn } from "@/lib/utils";
import Image from "next/image";

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
            <Badge
              variant={getBadgeVariant(surat?.status)}
              className="rounded-full flex items-center justify-center w-fit"
            >
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full mr-1",
                  getBadgeVariant(surat?.status) === "outline"
                    ? "bg-black"
                    : "bg-white"
                )}
              ></div>
              <div>{formatEnumValue(surat?.status)}</div>
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}

import { Badge } from "@/components/ui/badge";

export function PengajuanTerakhir() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Surat Keterangan Tidak Mampu
          </p>
          <p className="text-sm text-muted-foreground">12 Agustus 2021</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>Selesai</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Surat Keterangan Usaha
          </p>
          <p className="text-sm text-muted-foreground">12 Agustus 2021</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge>Selesai</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Surat Keterangan Domisili
          </p>
          <p className="text-sm text-muted-foreground">12 Agustus 2021</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant={"destructive"}>Ditolak</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Surat Keterangan Belum Pernah Kawin
          </p>
          <p className="text-sm text-muted-foreground">12 Agustus 2021</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant={"secondary"}>Pending</Badge>
        </div>
      </div>
      <div className="flex items-center">
        <div className="space-y-1">
          <p className="text-sm font-medium leading-none">
            Surat Keterangan Usaha
          </p>
          <p className="text-sm text-muted-foreground">12 Agustus 2021</p>
        </div>
        <div className="ml-auto font-medium">
          <Badge variant={"secondary"}>Pending</Badge>
        </div>
      </div>
    </div>
  );
}

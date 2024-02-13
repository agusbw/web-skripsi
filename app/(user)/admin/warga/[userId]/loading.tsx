import { Skeleton } from "@/components/ui/skeleton";
import DashboardContainer from "@/components/layouts/dashboard-container";
import { UserDataSkeleton } from "@/app/(user)/warga/pengajuan/(jenis)/_components/user-data";
import { SuratCountCardSkeleton } from "@/components/dashboard/surat-count-card";
import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
} from "lucide-react";

export default function Loading() {
  return (
    <DashboardContainer title="Informasi Warga">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-4 text-2xl font-medium">Data Warga</h3>
          <UserDataSkeleton />
          <div className="mt-5 ml-auto w-fit">
            <Skeleton className="w-32 h-8" />
          </div>
        </div>
        <div className="my-10">
          <h3 className="mb-4 text-2xl font-medium">Jumlah Pengajuan Surat</h3>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            <SuratCountCardSkeleton
              title="Total"
              Icon={Mails}
            />
            <SuratCountCardSkeleton
              title="Pending"
              Icon={MailQuestion}
              className="bg-yellow-500 text-white"
            />

            <SuratCountCardSkeleton
              title="Selesai"
              Icon={MailCheck}
              className="bg-green-500 text-white"
            />
            <SuratCountCardSkeleton
              title="Diambil"
              Icon={CheckCheck}
              className="bg-blue-500 text-white"
            />
            <SuratCountCardSkeleton
              title="Ditolak"
              Icon={MailX}
              className="bg-red-500 text-white"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">Riwayat Pengajuan Surat</h3>
          <div className="border rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
            <div className="flex items-center justify-between px-4 py-3 border-b border">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

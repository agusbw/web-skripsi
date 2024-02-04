import { UserDataSkeleton } from "@/app/(user)/warga/pengajuan/(jenis)/_components/user-data";
import DashboardContainer from "@/components/layouts/dashboard-container";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

export default function Loading() {
  return (
    <DashboardContainer title="Detail Pengajuan Surat">
      <p className="text-xl font-medium text-primary">Data Pemohon Surat</p>
      <UserDataSkeleton />
      <p className="text-xl font-medium text-primary mt-8">
        Data Pengajuan Surat
      </p>

      <div className="flex gap-3 items-end max-w-full">
        <div>
          <Label>No Surat: </Label>
          <Skeleton className="max-w-full w-[300px] h-9" />
        </div>
        <Skeleton className="h-9 max-w-[100px] flex-1" />
      </div>
      <div className={"flex gap-x-2 mt-3 items-center"}>
        <Label>Status: </Label>
        <Skeleton className="h-6 w-[84px] rounded-full" />
      </div>
      <div className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-2 mt-4">
        <div>
          <Skeleton className="w-1/5 h-4 mb-1 rounded-sm" />
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
        <div>
          <Skeleton className="w-1/5 h-4 mb-1 rounded-sm" />
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
        <div>
          <Skeleton className="w-1/5 h-4 mb-1 rounded-sm" />
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
        <div>
          <Skeleton className="w-1/5 h-4 mb-1 rounded-sm" />
          <Skeleton className="w-full h-9 rounded-sm" />
        </div>
      </div>
      <div className="mt-4">
        <div className="flex flex-col gap-y-2 sm:flex-row sm:gap-y-0 sm:gap-x-3">
          <Skeleton className="w-full sm:w-[100px] h-7 rounded-sm" />
          <Skeleton className="w-[100px] h-7 rounded-sm" />
        </div>
      </div>
    </DashboardContainer>
  );
}

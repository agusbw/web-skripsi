import DashboardContainer from "@/components/layouts/dashboard-container";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <DashboardContainer title="Data Pengambilan Surat">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Informasi</AlertTitle>
        <AlertDescription>
          Berikut adalah riwayat pengambilan surat yang telah dilakukan oleh
          warga.
        </AlertDescription>
      </Alert>
      <div className="flex w-full justify-end mt-5">
        <Skeleton className="h-10 w-32" />
      </div>
      <div>
        <div className="flex flex-col-reverse lg:flex-row justify-between lg:items-center gap-3 py-4">
          <Skeleton className="h-10 w-96 max-w-full" />
          <Skeleton className="h-8 w-28" />
        </div>
        <div className="border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

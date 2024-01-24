import { Skeleton } from "@/components/ui/skeleton";
import DashboardContainer from "@/components/layouts/dashboard-container";
import { UserDataSkeleton } from "@/app/(user)/warga/pengajuan/(jenis)/_components/user-data";
import { Contact, FileBarChart, FileClock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Loading() {
  return (
    <DashboardContainer title="Informasi Warga">
      <div className="flex flex-col gap-5">
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <Contact className="inline-block w-6 h-6 text-primary" /> Detail
            Data Warga
          </h3>
          <UserDataSkeleton />
          <div className="mt-5 ml-auto w-fit">
            <Skeleton className="w-32 h-8" />
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <FileBarChart className="inline-block w-6 h-6 text-primary" />{" "}
            Jumlah Pengajuan Surat
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Total</CardTitle>
                <CardDescription className="font-medium text-sm">
                  <Skeleton className="w-10 h-4" />
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Pending</CardTitle>
                <CardDescription className="font-medium text-sm">
                  <Skeleton className="w-10 h-4" />
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Selesai</CardTitle>
                <CardDescription className="font-medium text-sm">
                  <Skeleton className="w-10 h-4" />
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Ditolak</CardTitle>
                <CardDescription className="font-medium text-sm">
                  <Skeleton className="w-10 h-4" />
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-medium">
            <FileClock className="inline-block w-6 h-6 text-primary" /> Riwayat
            Pengajuan Surat
          </h3>
          <div className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
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
            </div>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

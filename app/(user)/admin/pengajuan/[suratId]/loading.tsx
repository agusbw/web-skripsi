import { UserDataSkeleton } from "@/app/(user)/warga/pengajuan/(jenis)/_components/user-data";
import DashboardContainer from "@/components/layouts/dashboard-container";

export default function Loading() {
  return (
    <DashboardContainer title="Detail Pengajuan Surat">
      <p className="text-xl font-medium text-primary">Data Pemohon Surat</p>
      <UserDataSkeleton />
      <p className="text-xl font-medium text-primary mt-8">
        Data Pengajuan Surat
      </p>
    </DashboardContainer>
  );
}

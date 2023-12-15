import DashboardContainer from "@/components/layouts/dashboard-container";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BiodataPage() {
  return (
    <DashboardContainer title="Pengajuan Surat">
      <h1>Halaman utama riwayat pengajuan surat</h1>
    </DashboardContainer>
  );
}

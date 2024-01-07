import DashboardContainer from "@/components/layouts/dashboard-container";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardContainer title="Tambah Pengajuan Surat">
      {children}
    </DashboardContainer>
  );
}

import DashboardContainer from "@/components/layouts/dashboard-container";

export default function AdminDashboardLayout({
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

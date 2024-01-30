import DashboardContainer from "@/components/layouts/dashboard-container";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Pengajuan",
  description: "Data pengajuan surat warga.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PengajuanPage() {
  return (
    <DashboardContainer title="Data Pengajuan Surat">
      <p>halaman pengajuan surat</p>
    </DashboardContainer>
  );
}

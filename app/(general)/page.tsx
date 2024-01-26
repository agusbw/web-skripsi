import Hero from "@/app/(general)/_components/hero";
import ComplaintStepsSection from "@/app/(general)/_components/complaint-steps-section";
import StatisticsSection from "@/app/(general)/_components/statistics-section";
import HelpCta from "@/app/(general)/_components/help-cta";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description: "Beranda Sistem Informasi Pengajuan Surat Keterangan",
};

export default function HomePage() {
  // TODO: Benerin desainnya brok + responsive

  return (
    <>
      <Hero />
      <StatisticsSection />
      <ComplaintStepsSection />
      <HelpCta />
    </>
  );
}

import Hero from "@/app/(general)/_components/hero";
import ComplaintStepsSection from "@/app/(general)/_components/complaint-steps-section";
import StatisticsSection from "@/app/(general)/_components/statistics-section";
import HelpCta from "@/app/(general)/_components/help-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatisticsSection />
      <ComplaintStepsSection />
      <HelpCta />
    </>
  );
}

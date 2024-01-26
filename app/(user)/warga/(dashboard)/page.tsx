import DashboardContainer from "@/components/layouts/dashboard-container";
import { type Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SuratCountCard from "@/components/dashboard/surat-count-card";
import { BarChartSurat, PieChartSurat } from "@/components/dashboard/charts";
import { UserLatestRequest as LatestRequest } from "@/components/dashboard/latest-request";
import { Mails, MailX, MailCheck, MailQuestion } from "lucide-react";
import {
  fetchUserTotalSurat,
  fetchUserTotalSuratByKategori,
  fetchUserBarChartData,
  fetchUserLatestSurat,
} from "@/lib/data";

export const metadata: Metadata = {
  title: "Overview",
  description: "Dashboard utama warga",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WargaDashboardPage() {
  const suratPromise = fetchUserTotalSurat();
  const suratByKategoriPromise = fetchUserTotalSuratByKategori();
  const suratByMonthPromise = fetchUserBarChartData();
  const userLatestSuratPromise = fetchUserLatestSurat();

  const [surat, suratByKategori, suratByMonth, userLatestSurat] =
    await Promise.all([
      suratPromise,
      suratByKategoriPromise,
      suratByMonthPromise,
      userLatestSuratPromise,
    ]);

  return (
    <DashboardContainer title="Dashboard">
      <>
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
              <SuratCountCard
                count={surat?.total}
                title="Total Surat"
                Icon={Mails}
              />
              <SuratCountCard
                count={surat?.pending}
                title="Surat Pending"
                Icon={MailQuestion}
              />
              <SuratCountCard
                count={surat?.selesai}
                title="Surat Selesai"
                Icon={MailCheck}
              />
              <SuratCountCard
                count={surat?.ditolak}
                title="Surat Ditolak"
                Icon={MailX}
              />
            </div>
            <div className="grid lg:gap-4 gap-y-4 lg:gap-y-0 grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Pengajuan Surat Terakhir</CardTitle>
                  <CardDescription>
                    4 data pengajuan surat terakhir yang anda lakukan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LatestRequest data={userLatestSurat} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Grafik Pengajuan Surat</CardTitle>
                </CardHeader>
                <CardContent className="-ml-10">
                  <BarChartSurat data={suratByMonth} />
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Grafik Jenis Surat</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <PieChartSurat data={suratByKategori} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    </DashboardContainer>
  );
}

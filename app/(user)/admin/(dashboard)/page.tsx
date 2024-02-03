import DashboardContainer from "@/components/layouts/dashboard-container";
import { type Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartSurat, PieChartSurat } from "@/components/dashboard/charts";
import { AdminLatestRequest as LatestRequest } from "@/components/dashboard/latest-request";
import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
} from "lucide-react";
import {
  fetchTotalSurat,
  fetchTotalSuratByKategori,
  fetchBarChartData,
  fetchLatestSurat,
} from "@/lib/server/data";
import SuratCountCard from "@/components/dashboard/surat-count-card";

export const metadata: Metadata = {
  title: "Overview",
  description: "Dashboard utama admin",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const suratPromise = fetchTotalSurat();
  const suratByKategoriPromise = fetchTotalSuratByKategori();
  const suratByMonthPromise = fetchBarChartData();
  const latestSuratPromise = fetchLatestSurat();

  const [surat, suratByKategori, suratByMonth, latestSurat] = await Promise.all(
    [
      suratPromise,
      suratByKategoriPromise,
      suratByMonthPromise,
      latestSuratPromise,
    ]
  );

  return (
    <DashboardContainer title="Dashboard Admin">
      <>
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-5">
              <SuratCountCard
                count={surat?.total}
                title="Total Surat"
                Icon={Mails}
                className="col-span-2 lg:col-span-1"
              />
              <SuratCountCard
                count={surat?.pending}
                title="Surat Pending"
                Icon={MailQuestion}
                className="bg-yellow-500 text-white"
              />
              <SuratCountCard
                count={surat?.selesai}
                title="Surat Selesai"
                Icon={MailCheck}
                className="bg-green-500 text-white"
              />
              <SuratCountCard
                count={surat?.ditolak}
                title="Surat Diambil"
                Icon={CheckCheck}
                className="bg-blue-500 text-white"
              />
              <SuratCountCard
                count={surat?.ditolak}
                title="Surat Ditolak"
                className="bg-red-500 text-white"
                Icon={MailX}
              />
            </div>
            <div className="grid lg:gap-4 gap-y-4 lg:gap-y-0 grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Pengajuan Surat Terakhir</CardTitle>
                  <CardDescription>
                    4 data pengajuan surat terakhir yang warga lakukan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LatestRequest data={latestSurat} />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Grafik Pengajuan Surat</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChartSurat data={suratByMonth} />
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Grafik Jenis Surat</CardTitle>
                </CardHeader>
                <CardContent>
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

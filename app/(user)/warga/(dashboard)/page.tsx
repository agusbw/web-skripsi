import DashboardContainer from "@/components/layouts/dashboard-container";
import { type Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChartSurat, PieChartSurat } from "./_components/charts";
import { PengajuanTerakhir } from "./_components/pengajuan-terakhir";
import { Mails, MailX, MailCheck, MailQuestion } from "lucide-react";

export const metadata: Metadata = {
  title: "Overview",
  description: "Dashboard utama warga",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BiodataPage() {
  return (
    <DashboardContainer title="Dashboard">
      <>
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Pengajuan Surat
                  </CardTitle>
                  <Mails className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">120</div>
                  <p className="text-xs text-muted-foreground">
                    +4 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Surat Pending
                  </CardTitle>
                  <MailQuestion className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40</div>
                  <p className="text-xs text-muted-foreground">
                    +1 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Surat Diterima
                  </CardTitle>
                  <MailCheck className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40</div>
                  <p className="text-xs text-muted-foreground">
                    +1 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Surat Ditolak
                  </CardTitle>
                  <MailX className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">40</div>
                  <p className="text-xs text-muted-foreground">
                    +1 dari bulan lalu
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="grid lg:gap-4 gap-y-4 lg:gap-y-0 grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Pengajuan Surat Terakhir</CardTitle>
                  <CardDescription>
                    Kamu melakukan X pengajuan surat pada bulan ini.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PengajuanTerakhir />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Total Pengajuan Surat</CardTitle>
                </CardHeader>
                <CardContent className="-ml-10">
                  <BarChartSurat />
                </CardContent>
              </Card>
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Total Berdasarkan Jenis Surat</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <PieChartSurat />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    </DashboardContainer>
  );
}

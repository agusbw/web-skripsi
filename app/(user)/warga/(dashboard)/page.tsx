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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserLatestRequest as LatestRequest } from "@/components/dashboard/latest-request";
import Link from "next/link";
import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
} from "lucide-react";
import { fetchUserTotalSurat, fetchUserLatestSurat } from "@/lib/data";

export const metadata: Metadata = {
  title: "Overview",
  description: "Dashboard utama warga",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function WargaDashboardPage() {
  const suratPromise = fetchUserTotalSurat();
  const userLatestSuratPromise = fetchUserLatestSurat();

  const [surat, userLatestSurat] = await Promise.all([
    suratPromise,
    userLatestSuratPromise,
  ]);

  return (
    <DashboardContainer title="Dashboard Warga">
      <>
        <div className="mb-4">
          <p className="text-2xl font-medium text-primary">Selamat Datang, </p>
          <p className="text-lg text-muted-foreground">
            Untuk mengajukan surat keterangan, silakan ke menu{" "}
            <Link
              href={"/warga/pengajuan"}
              className="text-primary hover:underline"
            >
              Ajukan Surat
            </Link>
          </p>
        </div>
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
                    Data pengajuan surat terakhir yang anda lakukan.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LatestRequest data={userLatestSurat} />
                </CardContent>
              </Card>
              <Card className="col-span-5">
                <CardHeader className="text-xl">
                  <CardTitle>Arti Status Surat</CardTitle>
                  <CardDescription>
                    Penjelasan mengenai status surat yang anda ajukan.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <Alert className="bg-yellow-500/10 text-yellow-600">
                    <AlertTitle>Pending</AlertTitle>
                    <AlertDescription>
                      Status pending menandakan bahwa surat anda sedang dalam
                      proses verifikasi oleh admin
                    </AlertDescription>
                  </Alert>
                  <Alert className="bg-green-500/10 text-green-600">
                    <AlertTitle>Selesai</AlertTitle>
                    <AlertDescription>
                      Status selesai menandakan bahwa surat anda telah selesai
                      diproses dan siap diambil di kantor desa.
                    </AlertDescription>
                  </Alert>
                  <Alert className="bg-blue-500/10 text-blue-600">
                    <AlertTitle>Diambil</AlertTitle>
                    <AlertDescription>
                      Status diambil menandakan bahwa anda telah mengambil surat
                      tersebut di kantor desa.
                    </AlertDescription>
                  </Alert>
                  <Alert className="bg-red-500/10 text-red-600">
                    <AlertTitle>Ditolak</AlertTitle>
                    <AlertDescription>
                      Status ditolak menandakan bahwa surat anda ditolak oleh
                      admin dengan alasan tertentu.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </>
    </DashboardContainer>
  );
}

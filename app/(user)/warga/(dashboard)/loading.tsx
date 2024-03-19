import DashboardContainer from "@/components/layouts/dashboard-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
  Loader,
} from "lucide-react";
import { SuratCountCardSkeleton } from "@/components/dashboard/surat-count-card";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export default async function Loading() {
  return (
    <DashboardContainer title="Dashboard Warga">
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            <SuratCountCardSkeleton
              title="Total Surat"
              className="bg-primary"
              Icon={Mails}
            />
            <SuratCountCardSkeleton
              title="Surat Pending"
              className="bg-yellow-500"
              Icon={Loader}
            />
            <SuratCountCardSkeleton
              title="Surat Diproses"
              className="bg-teal-500"
              Icon={MailQuestion}
            />
            <SuratCountCardSkeleton
              className="bg-green-500"
              title="Surat Diterima"
              Icon={MailCheck}
            />
            <SuratCountCardSkeleton
              className="bg-blue-500"
              title="Surat Diambil"
              Icon={CheckCheck}
            />
            <SuratCountCardSkeleton
              className="bg-red-500"
              title="Surat Ditolak"
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
                <div className="space-y-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      className="flex items-center"
                      key={i}
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">
                          <Skeleton className="w-36 h-4" />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <Skeleton className="w-24 h-4" />
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <Skeleton className="w-16 h-4" />
                      </div>
                    </div>
                  ))}
                </div>
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
                <Alert className="bg-teal-500/10 text-teal-600">
                  <AlertTitle>Diproses</AlertTitle>
                  <AlertDescription>
                    Status diproses menandakan bahwa surat anda sedang dalam
                    proses verifikasi dan penandatanganan oleh perbekel.
                  </AlertDescription>
                </Alert>
                <Alert className="bg-green-500/10 text-green-600">
                  <AlertTitle>Diterima</AlertTitle>
                  <AlertDescription>
                    Status diterima menandakan bahwa surat anda telah selesai
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
    </DashboardContainer>
  );
}

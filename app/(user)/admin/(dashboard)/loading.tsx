import DashboardContainer from "@/components/layouts/dashboard-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
 import {
  Mails,
  MailX,
  MailCheck,
  MailQuestion,
  CheckCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SuratCountCardSkeleton } from "@/components/dashboard/surat-count-card";

export default async function Loading() {
  return (
    <DashboardContainer title="Dashboard Admin">
      <div className="flex-col md:flex">
        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <SuratCountCardSkeleton
              title="Total Surat"
              className="bg-primary col-span-2 lg:col-span-1"
              Icon={Mails}
            />
            <SuratCountCardSkeleton
              title="Surat Pending"
              className="bg-yellow-500"
              Icon={MailQuestion}
            />
            <SuratCountCardSkeleton
              className="bg-green-500"
              title="Surat Selesai"
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
                  4 data pengajuan surat terakhir yang warga lakukan
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
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Grafik Pengajuan Surat</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-64" />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Grafik Jenis Surat</CardTitle>
              </CardHeader>
              <CardContent>
                <Skeleton className="w-full h-64" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

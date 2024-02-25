import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonTable() {
  return (
    <div>
      {/* create a table-like skeleton */}
      <div className="flex justify-end w-full my-4">
        <Skeleton className="h-8 w-28" />
      </div>
      <div className="border rounded-lg">
        <div className="flex items-center justify-between px-4 py-3 border-b border">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-b border">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-24 h-6" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <DashboardContainer title="Riwayat Pengajuan Surat">
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="diproses">Diproses</TabsTrigger>
          <TabsTrigger value="diterima">Diterima</TabsTrigger>
          <TabsTrigger value="diambil">Diambil</TabsTrigger>
          <TabsTrigger value="ditolak">Ditolak</TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Informasi!</AlertTitle>
            <AlertDescription>
              Pengajuan surat yang{" "}
              <span className="font-bold">belum diproses/dilihat admin</span>{" "}
              akan ditampilkan di sini.
            </AlertDescription>
          </Alert>
          <SkeletonTable />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

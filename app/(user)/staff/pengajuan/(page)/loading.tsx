import DashboardContainer from "@/components/layouts/dashboard-container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

function SkeletonTable() {
  return (
    <div>
      <div className="flex justify-between w-full my-4">
        <div className="flex sm:flex-row flex-wrap flex-col-reverse gap-y-2 sm:gap-y-0 sm:gap-x-3 mt-8">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="h-8 w-28" />
        </div>
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
    <DashboardContainer title="Data Pengajuan Surat">
      <div className="flex justify-end mb-4">
        <Skeleton className="w-44 h-8" />
      </div>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">
            <Skeleton className="w-16 h-4" />
          </TabsTrigger>
          <TabsTrigger value="diproses">
            <Skeleton className="w-16 h-4" />
          </TabsTrigger>
          <TabsTrigger value="diproses">
            <Skeleton className="w-16 h-4" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <SkeletonTable />
        </TabsContent>
        <TabsContent value="diproses">
          <SkeletonTable />
        </TabsContent>
        <TabsContent value="diterima">
          <SkeletonTable />
        </TabsContent>
        <TabsContent value="ditolak">
          <SkeletonTable />
        </TabsContent>
      </Tabs>
    </DashboardContainer>
  );
}

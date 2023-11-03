import DashboardContainer from "@/components/layouts/dashboard-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <DashboardContainer title="Manajemen Data Warga">
      <div className="flex justify-end w-full">
        <Skeleton className="h-10 w-44" />
      </div>
      <div>
        <div className="flex items-center gap-3 py-4">
          <Skeleton className="h-10 w-96" />
          <Skeleton className="h-10 w-96" />
        </div>
        {/* create a table-like skeleton */}
        <div className="border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
            <Skeleton className="w-24 h-6" />
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

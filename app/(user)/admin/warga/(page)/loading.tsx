import DashboardContainer from "@/components/layouts/dashboard-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <DashboardContainer title="Data Warga">
      <div className="flex gap-x-2 justify-end w-full">
        <Skeleton className="h-10 w-36" />
        <Skeleton className="h-10 w-36" />
      </div>
      <div>
        <div className="flex flex-col sm:flex-row items-center gap-2 py-4">
          <Skeleton className="h-8 w-full sm:w-96" />
          <Skeleton className="h-8 w-full sm:w-96" />
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

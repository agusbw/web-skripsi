import DashboardContainer from "@/components/layouts/dashboard-container";
import {
  KategoriTable,
  KategoriTableSkeleton,
} from "./_components/kategori-table";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kategori Surat",
  description: "Kategori surat",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function KategoriPage({
  searchParams,
}: {
  searchParams?: {
    startDate?: string;
    endDate?: string;
  };
}) {
  const startDate = searchParams?.startDate ?? null;
  const endDate = searchParams?.endDate ?? null;

  return (
    <DashboardContainer title={"Kategori Surat"}>
      <p className="mb-5 text-muted-foreground">
        Berikut adalah jumlah pengajuan surat keterangan berdasarkan kategori
        surat.
      </p>
      <p className="text-sm font-medium text-muted-foreground mb-2">
        Pilih Rentang Waktu:{" "}
      </p>
      <Suspense
        key={(startDate ? startDate : "start") + (endDate ? endDate : "end")}
        fallback={<KategoriTableSkeleton />}
      >
        <KategoriTable
          dateFilter={{
            endDate,
            startDate,
          }}
        />
      </Suspense>
    </DashboardContainer>
  );
}

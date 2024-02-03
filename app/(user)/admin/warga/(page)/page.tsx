import DashboardContainer from "@/components/layouts/dashboard-container";
import { WargaDataTable } from "../_components/data-warga-table";
import { listWargaColumns } from "../_components/data-warga-column";
import { fetchWargaList } from "@/lib/server/data";
import CreateWarga from "../_components/create-warga-button";
import type { Metadata } from "next";
import ExportPDF from "../_components/export-pdf";

export const metadata: Metadata = {
  title: "Warga",
};

export default async function AdminWargaPage() {
  const data = await fetchWargaList();

  return (
    <DashboardContainer title="Data Warga">
      <div className="flex justify-end w-full gap-3">
        <CreateWarga variant="default" />
        <ExportPDF data={data} />
      </div>
      <WargaDataTable
        columns={listWargaColumns}
        data={data}
      />
    </DashboardContainer>
  );
}

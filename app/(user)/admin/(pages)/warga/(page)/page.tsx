import DashboardContainer from "@/components/layouts/dashboard-container";
import { WargaDataTable } from "../_components/data-warga-table";
import { listWargaColumns } from "../_components/data-warga-column";
import { fetchWargaList } from "@/lib/data";
import CreateWarga from "../_components/create-warga-button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warga",
};

export default async function AdminWargaPage() {
  const data = await fetchWargaList();

  return (
    <DashboardContainer title="Manajemen Data Warga">
      <div className="flex justify-end w-full">
        <CreateWarga variant="default" />
      </div>
      <WargaDataTable
        columns={listWargaColumns}
        data={data}
      />
    </DashboardContainer>
  );
}

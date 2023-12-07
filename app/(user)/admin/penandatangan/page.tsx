import DashboardContainer from "@/components/layouts/dashboard-container";
import CraetePenandatanganButton from "./_components/create-button";
import { fetchPenandatangan } from "@/lib/data";
import { PenandatanganDataTable } from "./_components/data-table";
import { penandatanganColumns } from "./_components/columns";

export default async function PenandatanganPage() {
  const penandatangan = await fetchPenandatangan();

  return (
    <DashboardContainer title="Data Penandatangan">
      <div className="flex w-full justify-end mb-8">
        <CraetePenandatanganButton />
      </div>
      <PenandatanganDataTable
        columns={penandatanganColumns}
        data={penandatangan}
      />
    </DashboardContainer>
  );
}

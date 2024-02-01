"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { KategoriSurat, Surat } from "@prisma/client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export default function DataTableWrapper({
  data,
}: {
  data: (Surat & { kategori_surat: KategoriSurat })[];
}) {
  const [startDate, setStartDate] = useState<null | Date>(null);
  const [endDate, setEndDate] = useState<null | Date>(null);

  if (startDate && endDate) {
    data = data.filter((d) => {
      const date = new Date(d.createdAt);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      return (
        date.getTime() >= startDate.getTime() &&
        date.getTime() <= endDate.getTime()
      );
    });
  }

  return (
    <div>
      <div className="flex gap-x-2 items-center my-3">
        <input
          type="date"
          id="startDateInput"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            if (e.target.value) setStartDate(new Date(e.target.value));
            else setStartDate(null);
          }}
        />
        <span className="font-semibold">-</span>
        <input
          type="date"
          id="endDateInput"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            if (e.target.value) setEndDate(new Date(e.target.value));
            else setEndDate(null);
          }}
        />
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            setStartDate(null);
            setEndDate(null);
            const startDateInput = document.getElementById(
              "startDateInput"
            ) as HTMLInputElement;
            const endDateInput = document.getElementById(
              "endDateInput"
            ) as HTMLInputElement;
            if (startDateInput) startDateInput.value = "";
            if (endDateInput) endDateInput.value = "";
          }}
        >
          <RefreshCcw size={16} />
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

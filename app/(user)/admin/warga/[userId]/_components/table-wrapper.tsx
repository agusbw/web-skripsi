"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import type { KategoriSurat, Surat } from "@prisma/client";
import { useState } from "react";

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
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            if (e.target.value) setStartDate(new Date(e.target.value));
            else setStartDate(null);
          }}
        />
        <span className="font-semibold">-</span>
        <input
          type="date"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            if (e.target.value) setEndDate(new Date(e.target.value));
            else setEndDate(null);
          }}
        />
      </div>
      <DataTable
        columns={columns}
        data={data}
      />
    </div>
  );
}

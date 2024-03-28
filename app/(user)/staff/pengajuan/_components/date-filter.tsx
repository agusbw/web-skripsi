"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import format from "date-fns-tz/format";
import id from "date-fns/locale/id";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DateFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  const startDate = searchParams.get("startDate")
    ? new Date(searchParams.get("startDate")!)
    : null;
  startDate?.setUTCHours(0, 0, 0, 0);

  const endDate = searchParams.get("endDate")
    ? new Date(searchParams.get("endDate")!)
    : null;

  endDate?.setUTCHours(23, 59, 59, 999);

  function handleStartDateChange(date: string | null) {
    if (date) {
      params.set("startDate", date);
    } else {
      params.delete("startDate");
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  function handleEndDateChange(date: string | null) {
    if (date) {
      params.set("endDate", date);
    } else {
      params.delete("endDate");
    }
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div>
      <div className="flex gap-x-2 items-center">
        <input
          type="date"
          id="startDateInput"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            handleStartDateChange(e.target.value);
          }}
          defaultValue={searchParams.get("startDate")?.toString()}
        />
        <span className="font-semibold">-</span>
        <input
          type="date"
          id="endDateInput"
          className="border-2 rounded-lg p-1 focus:outline-primary"
          onChange={(e) => {
            handleEndDateChange(e.target.value);
          }}
          defaultValue={searchParams.get("endDate")?.toString()}
        />
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={() => {
            handleStartDateChange(null);
            handleEndDateChange(null);

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
      <p className="my-2 text-sm">
        Menampilkan data:{" "}
        {startDate && endDate
          ? `${format(startDate, "dd MMMM yyyy", {
              locale: id,
            })} -  ${format(endDate.setUTCHours(10, 0, 0, 0), "dd MMMM yyyy", {
              locale: id,
            })}`
          : "Semua periode"}
      </p>
    </div>
  );
}
